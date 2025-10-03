"use client"

import type React from "react"
import questionnaire from "./questions";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import { ltTranslations } from './zxcvbn-lt'
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { CheckCircle, XCircle, Shield, Lock, Wifi, RefreshCw, Eye } from "lucide-react"
type AnswerState = {
  selectedAnswer: number | null;
  showResult: boolean;
  answered: boolean;
};
export default function InternetSafetyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [answersState, setAnswersState] = useState<{ [id: number]: AnswerState }>({});
  const [pw, setPw] = useState("");
  const analysis = pw ? zxcvbn(pw) : null;

  const handleAnswerSelect = (qId: number, index: number, e: React.MouseEvent<HTMLButtonElement>) => {

  const rect = e.currentTarget.getBoundingClientRect();

  const shootConfetti = (x: number,y: number) => {
    confetti({
      particleCount: 100,
      angle: 60,           // angle in degrees (0 = right, 90 = down)
      spread: 55,           // spread of particles
      origin: { x: x / window.innerWidth, y: y / window.innerHeight }, // bottom center
      gravity: 0.7,
      colors: ["#ff0", "#0f0", "#0ff", "#f00", "#00f"]
    });
  };
  setAnswersState((prev) => ({
    ...prev,
    [qId]: { selectedAnswer: index, showResult: true, answered: true },
  }));
  if (index === questionnaire[currentQuestion].correctAnswer) {
      shootConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
      setScore(score + 1)
    }
};


const options = {
  translations: ltTranslations,
}
zxcvbnOptions.setOptions(options);

const handleNextQuestion = () => {
  if (currentQuestion < questionnaire.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  } else {
    setQuizCompleted(true)
  }
}
const swipe = (dir: number) => {
    setDirection(dir);
    setCurrentQuestion((prev) => prev + dir);
  };

  const resetQuiz = () => {
    setAnswersState({});
    setCurrentQuestion(0)
    setScore(0)
    setQuizCompleted(false)
  }

const getScoreMessage = () => {
  const percentage = (score / questionnaire.length) * 100
  if (percentage === 100) return "🎉 Tobulai! Tu tikras interneto saugumo ekspertas!"
  if (percentage >= 80) return "🌟 Puikiai! Tikrai daug žinai!"
  if (percentage >= 60) return "👍 Gerai padirbėta! Toliau gilink žinias!"
  return "📚 Dar reikėtų pasistengti - saugumas internete labai svarbu!"
}

  if (quizCompleted) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white border-2 border-primary/20 shadow-xl">
            <CardHeader className="text-center  rounded-t-lg">
              <CardTitle className="text-3xl font-bold">Klausimynas baigtas! 🎯</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-2">
                  {score}/{questionnaire.length}
                </div>
                <p className="text-xl text-muted-foreground mb-4">{getScoreMessage()}</p>
              </div>

              <Card className="">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="w-5 h-5 text-primary" />
                    Saugaus elgesio internete apibendrinimas:
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Saugūs slaptažodžiai</p>
                      <p className="text-sm text-muted-foreground">Kiekvienai paskyrai naudok unikalius, sudėtingus slaptažodžius</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Nesidalink jautriais duomenimis</p>
                      <p className="text-sm text-muted-foreground">
                        Niekada el. paštu nesidalink savo prisijungimais ar kita jautria informacija
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wifi className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Dviejų žingsnių autentifikacija“</p>
                      <p className="text-sm text-muted-foreground">
                        Papildomai apsaugok savo paskyras su dviejų žingsnių autentifikacija
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <RefreshCw className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold">Atnaujinimai</p>
                      <p className="text-sm text-muted-foreground">Atnaujink savo įrangą ir programas, kad 'Hakeriai' negalėtų į jas įsibrauti</p>
                    </div>
                  </div>
              
                </CardContent>
              </Card>

              <Button onClick={resetQuiz} className="w-full" size="lg">
                Pakartok klausimyną
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
       

        <div className="mb-6">
          <div className="flex justify-center items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
               {currentQuestion + 1} / {questionnaire.length}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm font-mono">
              <ChevronLeft className="w-4 h-4 animate-pulse" />
              <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/10">Perbraukite kitam klausimui</span>
              <ChevronRight className="w-4 h-4 animate-pulse" />
            </div>
            <div className="relative w-full max-w-md mx-auto mt-10">

            {questionnaire.slice(currentQuestion, currentQuestion + 3).map((q, index) => {
                const isTop = index === 0;
                  const cardState = answersState[q.id] || { selectedAnswer: null, showResult: false, answered: false };

        return (
      <>
        <AnimatePresence key={q.id} mode="wait">
          <motion.div
                      custom={direction}
                      className="bg-white text-center absolute w-full cursor-grab"
                      initial={{ y: 20 * index, scale: 1 - 0.05 * index, opacity: 1 }}
                      animate={{ y: 20 * index, scale: 1 - 0.05 * index, opacity: 1 }}
                      exit="exit"
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      drag={isTop ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={
                        isTop 
                          ? (_event, info) => {
                              if (info.offset.x < -200 && currentQuestion < questionnaire.length - 1) swipe(1);
                              if (info.offset.x > 200 && currentQuestion > 0) swipe(-1);
                            }
                          : undefined
                      }
                      style={{ pointerEvents: isTop ? "auto" : "none", zIndex: 10 - index }}
                    >
                  <Card className="shadow-xl bg-dark "
                    style={{opacity: isTop ? 1 : 0.4}}>
                    <CardHeader className="">
                      <CardTitle className="flex items-center gap-3 text-4xl">
                        {/* {questionnaire[currentQuestion].icon} */}
                        <span className="text-balance">{q.question}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-3 mb-6">
                        {q.options.map((option, index) => (
                          <Button
                            key={index}
                            variant={
                                cardState.showResult
                                ? index === q.correctAnswer
                                  ? "default"
                                  : index === cardState.selectedAnswer
                                    ? "destructive"
                                    : "outline"
                                : "outline"
                              }
                              onClick={(e) => handleAnswerSelect(q.id, index,e)}
                              disabled={cardState.showResult}
                              className={`w-full rounded-full text-left justify-start h-auto p-4 text-wrap ${
                                cardState.showResult && isTop && index === q.correctAnswer
                                  ? "bg-green-400 hover:bg-green-600 text-white" 
                                  : cardState.showResult && isTop &&  index === cardState.selectedAnswer && index !== q.correctAnswer
                                    ? "bg-red-400 hover:bg-red-600 text-white"
                                    : ""
                              }`}
                            >
                            <div className="flex items-center gap-3">
                              {cardState.answered && cardState.showResult && index === q.correctAnswer && (
                                <>
                                <CheckCircle className="w-5 h-5" />
                                </>
                              )}
                              {cardState.answered && cardState.showResult && index === cardState.selectedAnswer && index !== q.correctAnswer && (
                                <XCircle className="w-5 h-5" />
                              )}
                              <span className="text-pretty">{option}</span>
                            </div>
                          </Button>
                        ))}
                      </div>

                      {cardState.showResult && (
                        <Card className="border-primary/20">
                          <CardContent className="p-4">
                                {cardState.selectedAnswer === q.correctAnswer ? 
                                    q.success && <><img src={q.success} alt="question media"  className="m-auto mb-5 w-48 h-48 overflow-hidden rounded-2xl" /><strong>Teisingai! 🎉</strong><br></br></>
                                    : 
                                    q.error && <><img src={q.error} alt="question media"  className="content-center  m-auto w-48 h-48 overflow-hidden rounded-2xl" /><strong>Ne visai! 🤔</strong><br></br></>}
                                    {" "}
                                    {q.explanation}
                          </CardContent>
                          {q.id === 1 && ( 
                            <div>
                              <strong>Nori sužinoti kiek laiko užtruktų 'nulaužti' slaptažodį?</strong><br></br>
                                <input
                                  type="password"
                                  value={pw}
                                  onChange={(e) => setPw(e.target.value)}
                                  placeholder="Įvesk slaptažodį"
                                />

                                {analysis && (
                                  <div>
                                    <div>Užtruktų {analysis.crackTimesDisplay.offlineSlowHashing1e4PerSecond}</div>
                                  </div>
                                )}
                              </div>
                          )}
                        </Card>
                      )}
                          
                        
                        
                      {cardState.showResult && (
                        <Button onClick={handleNextQuestion} className="w-full mt-4" size="lg">
                          {currentQuestion < questionnaire.length - 1 ? "Kitas klausimas" : "Pamatyk rezultatus!"}
                        </Button>
                      )}
                    </CardContent>
                </Card>
            </motion.div>
          </AnimatePresence>
      </>
    );

          

      })}

        </div>
        
      </div>
       
    </div>
  )
}