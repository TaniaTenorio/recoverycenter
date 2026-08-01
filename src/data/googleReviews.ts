export type GoogleReview = {
  author: string;
  date: string;
  rating: number;
  text: string;
  avatarUrl?: string;
};

export type GoogleReviewsPayload = {
  source: "fallback" | "google_places";
  placeName?: string;
  rating?: number;
  userRatingsTotal?: number;
  reviews: GoogleReview[];
};

export const fallbackGoogleReviews: GoogleReview[] = [
  {
    author: "LuisART Photography",
    date: "25 Mayo 2022",
    rating: 5,
    text: "Super atentos desde el primer momento. Aclararon todas mis dudas y mantuvieron comunicacion en todo el proceso. Recuperaron el 99.9 por ciento de un disco duro de 8 TB. Los recomiendo ampliamente.",
  },
  {
    author: "Julian Gomez",
    date: "14 Febrero 2022",
    rating: 5,
    text: "Excelente trato, amplia informacion y resultados satisfactorios.",
  },
  {
    author: "Diego Muniz Garcia",
    date: "29 Enero 2022",
    rating: 5,
    text: "Un excelente trato y atencion, cualquier duda la aclaran con profesionalidad. Buen precio y buen tiempo de entrega.",
  },
  {
    author: "Sulamita Cazarez",
    date: "26 Noviembre 2021",
    rating: 5,
    text: "Excelente servicio, recuperacion de datos completos, siempre atentos a las dudas y resolvieron de forma satisfactoria.",
  },
  {
    author: "Jorge Fdz",
    date: "26 Noviembre 2021",
    rating: 5,
    text: "Excelente experiencia, muy profesionales y sobre todo un oasis cuando piensa uno que todo esta perdido.",
  },
  {
    author: "Veronica I Rivera Santibanez",
    date: "4 Septiembre 2021",
    rating: 5,
    text: "Realmente extraordinario servicio, mis datos recuperados al 99 por ciento. Felicidades.",
  },
  {
    author: "Blanca Albert",
    date: "24 Agosto 2021",
    rating: 5,
    text: "Excelente atencion y servicio. Muy profesionales y cumplieron con lo prometido.",
  },
  {
    author: "Renato Gonzalez",
    date: "3 Mayo 2021",
    rating: 5,
    text: "Nos apoyaron muy bien con la recuperacion de informacion. El trato fue muy bueno en todo el proceso y son expertos.",
  },
  {
    author: "Cliente verificado 01",
    date: "Reseña reciente",
    rating: 5,
    text: "Este usuario solo dejo una calificacion en Google.",
  },
  {
    author: "Cliente verificado 02",
    date: "Reseña reciente",
    rating: 5,
    text: "Este usuario solo dejo una calificacion en Google.",
  },
  {
    author: "Cliente verificado 03",
    date: "Reseña reciente",
    rating: 5,
    text: "Este usuario solo dejo una calificacion en Google.",
  },
  {
    author: "Cliente verificado 04",
    date: "Reseña reciente",
    rating: 5,
    text: "Este usuario solo dejo una calificacion en Google.",
  },
  {
    author: "Cliente verificado 05",
    date: "Reseña reciente",
    rating: 5,
    text: "Este usuario solo dejo una calificacion en Google.",
  },
  {
    author: "Cliente verificado 06",
    date: "Reseña reciente",
    rating: 5,
    text: "Este usuario solo dejo una calificacion en Google.",
  },
  {
    author: "Cliente verificado 07",
    date: "Reseña reciente",
    rating: 5,
    text: "Este usuario solo dejo una calificacion en Google.",
  },
];
