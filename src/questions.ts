
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  success: string;
  error: string;
}


const questionnaire: Question[] = [
  {
    id: 1,
    question: "Koks slaptažodis būtų saugiausias?",
    options: [
      "Tavo vardas ir gimimo data",
      "Mažųjų / didžiųjų raidžių, skaičių ir simbolių mišinys",
      "123456789",
      "Paprastas žodis, pvz.: 'Slaptažodis'",
    ],
    correctAnswer: 1,
    explanation:
      "Saugiausi slaptažodžiai susideda iš daug skirtingų raidžių, simbolių ir skaičių, tokio tipo slaptažodį sunkiausia 'nulaužti'",
    success: 'SuccessPassword.gif',
    error: 'Passworderror.gif'
  },
  {
    id: 2,
    question: "Gavai el. laišką iš 'banko', kuriame prašo tavo banko prisijungimų, ką darai?",
    options: [
      "Pateiki savo prisijungimus laiške",
      "Suvedi savo prisijungimus puslapyje, kurį atsiuntė laiške",
      "Ignoruoji laišką, praneši savo bankui",
      "Pasidalini su visais draugais, kad ir jie galėtų pateikti duomenis",
    ],
    correctAnswer: 2,
    explanation:
      "Tai ko gero 'Phishing' bandymas, dauguma įmonių, ypač bankai, niekada neprašys tavęs pateikti jautrių duomenų.",
    success: '/SuccessPhishing.gif',
    error: '/DataError.gif'
  },
  {
    id: 3,
    question: "Kas yra „dviejų faktorių autentifikacija“ (2FA)?",
    options: [
      "Slaptažodžio įvedimas du kartus",
      "Slaptažodis + papildomas patvirtinimo būdas (pvz., SMS kodas)",
      "Slaptažodžio pasidalijimas su draugu",
      "Prisijungimas tik iš vieno įrenginio",
    ],
    correctAnswer: 1,
    explanation:
      "Dviejų faktorių autentifikacija padeda apsaugoti tavo paskyras. Jeigu įsilaužėlis atspės tavo slaptažodį, jam vistiek reikės papildomo patvirtinimo.",
    success: '/Correct.webp',
    error: '/Error.webp'
  },
  {
    id: 4,
    question: "Ką reiškia, kai šalia tinklapio adreso matai užrakto ikoną (https://)?",
    options: [
      "Kad puslapis yra visiškai apsaugotas nuo visų virusų",
      "Kad puslapis priklauso valstybei",
      "Kad duomenys tarp tavęs ir puslapio yra užšifruoti",
      "Kad tai mokamas puslapis",
    ],
    correctAnswer: 2,
    explanation:
      "HTTPS užtikrina duomenų saugumą tarp naršyklės ir svetainės serverio, tad jei svetainės nuorodoj nematai HTTPS - nepateik jautrių duomenų.",
    success: '/httpSuccess.gif',
    error: '/httpError.gif'
  },
  {
    id: 5,
    question: "Kodėl svarbu reguliariai atnaujinti telefoną ar kompiuterį?",
    options: [
      "Kad įrenginys atrodytų naujesnis",
      "Kad atnaujinimai ištaisytų saugumo spragas",
      "Kad greičiau veiktų žaidimai",
      "Kad nereikėtų perkrauti telefono",
    ],
    correctAnswer: 1,
    explanation:
      "Neatnaujinti įrenginiai ir programinė įranga jau pažįstama 'Hakeriams', taip jie lengviau gali įsilaužti!",
    success: '/UpdateSuccess.gif',
    error: '/UpdateError.gif'
  },
];
export default questionnaire;