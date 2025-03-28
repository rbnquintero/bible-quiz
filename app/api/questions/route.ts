import { NextResponse } from "next/server"

// This is the data from the JSON file
const quizData = [
  {
    "page": 1,
    "question": "¿Quiénes llevaron a Jesús al Templo cuando era bebé?",
    "options": {
      "a": "Solo José",
      "b": "Solo María",
      "c": "María y José",
      "d": "Simeón y Ana"
    },
    "answer": {
      "letter": "c",
      "text": "María y José"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Te presento a Jesús",
      "keyword": "Mesías",
      "significado": "Es una palabra para identifiar al elegido por Dios para salvar al mundo.",
      "verse": "Pedro contestó: 'Tu eres el Mesías'",
      "cita": "Marcos 8:29"
    }
  },
  {
    "page": 1,
    "question": "¿Quiénes fueron las dos personas que reconocieron a Jesús como el Mesías?",
    "options": {
      "a": "Pedro y Juan",
      "b": "Simeón y Ana",
      "c": "José y María",
      "d": "Juan el Bautista y Jesús"
    },
    "answer": {
      "letter": "b",
      "text": "Simeón y Ana"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Te presento a Jesús",
      "keyword": "Mesías",
      "significado": "Es una palabra para identifiar al elegido por Dios para salvar al mundo.",
      "verse": "Pedro contestó: 'Tu eres el Mesías'",
      "cita": "Marcos 8:29"
    }
  },
  {
    "page": 1,
    "question": "¿Qué hizo Juan el Bautista cuando vio la señal del Espíritu Santo?",
    "options": {
      "a": "Se fue a casa",
      "b": "Dijo que Jesús era el Mesías",
      "c": "Llamó a más personas",
      "d": "Se escondió"
    },
    "answer": {
      "letter": "b",
      "text": "Dijo que Jesús era el Mesías"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Te presento a Jesús",
      "keyword": "Mesías",
      "significado": "Es una palabra para identifiar al elegido por Dios para salvar al mundo.",
      "verse": "Pedro contestó: 'Tu eres el Mesías'",
      "cita": "Marcos 8:29"
    }
  },
  {
    "page": 1,
    "question": "¿Por qué muchas personas no sabían que Jesús era el Salvador?",
    "options": {
      "a": "Porque Jesús no hablaba",
      "b": "Porque Jesús era un niño",
      "c": "Porque no lo reconocieron como el Mesías",
      "d": "Porque Jesús estaba durmiendo"
    },
    "answer": {
      "letter": "c",
      "text": "Porque no lo reconocieron como el Mesías"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Te presento a Jesús",
      "keyword": "Mesías",
      "significado": "Es una palabra para identifiar al elegido por Dios para salvar al mundo.",
      "verse": "Pedro contestó: 'Tu eres el Mesías'",
      "cita": "Marcos 8:29"
    }
  },
  {
    "page": 2,
    "question": "¿Qué dos cosas grandes iluminan la Tierra?",
    "options": {
      "a": "El sol y las estrellas",
      "b": "El sol y la luna",
      "c": "La luna y las nubes",
      "d": "El sol y las lámparas"
    },
    "answer": {
      "letter": "b",
      "text": "El sol y la luna"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "El día y la noche",
      "keyword": "Girar",
      "significado": "Es dar vueltas sobre un punto fijo.",
      "verse": "Y cayó la noche, y llegó la mañana.  Ese fue el primer día.",
      "cita": "Génesis 1: 5"
    }
  },
  {
    "page": 2,
    "question": "¿Por qué la luna brilla en la noche?",
    "options": {
      "a": "Porque tiene su propia luz",
      "b": "Porque refleja la luz del sol",
      "c": "Porque el sol la ilumina más",
      "d": "Porque la luna es muy grande"
    },
    "answer": {
      "letter": "b",
      "text": "Porque refleja la luz del sol"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "El día y la noche",
      "keyword": "Girar",
      "significado": "Es dar vueltas sobre un punto fijo.",
      "verse": "Y cayó la noche, y llegó la mañana.  Ese fue el primer día.",
      "cita": "Génesis 1: 5"
    }
  },
  {
    "page": 2,
    "question": "¿Qué pasa cuando la Tierra gira?",
    "options": {
      "a": "El sol se esconde",
      "b": "Un lado de la Tierra está de día y el otro de noche",
      "c": "La luna brilla más",
      "d": "El día nunca acaba"
    },
    "answer": {
      "letter": "b",
      "text": "Un lado de la Tierra está de día y el otro de noche"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "El día y la noche",
      "keyword": "Girar",
      "significado": "Es dar vueltas sobre un punto fijo.",
      "verse": "Y cayó la noche, y llegó la mañana.  Ese fue el primer día.",
      "cita": "Génesis 1: 5"
    }
  },
  {
    "page": 2,
    "question": "¿Qué debemos hacer durante el día, según el texto?",
    "options": {
      "a": "Dormir todo el día",
      "b": "Jugar y descansar",
      "c": "Despertar, alimentarnos y hacer nuestras labores",
      "d": "Estar en la oscuridad"
    },
    "answer": {
      "letter": "c",
      "text": "Despertar, alimentarnos y hacer nuestras labores"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "El día y la noche",
      "keyword": "Girar",
      "significado": "Es dar vueltas sobre un punto fijo.",
      "verse": "Y cayó la noche, y llegó la mañana.  Ese fue el primer día.",
      "cita": "Génesis 1: 5"
    }
  },
  {
    "page": 3,
    "question": "¿Qué les dijo Dios a Adán y Eva sobre el fruto del árbol?",
    "options": {
      "a": "Que podían comerlo",
      "b": "Que no debían comerlo",
      "c": "Que debían compartirlo con los demás",
      "d": "Que era un fruto mágico"
    },
    "answer": {
      "letter": "b",
      "text": "Que no debían comerlo"
    },
    "context": {
      "subject": "Eres especial",
      "title": "La felicidad de obedecer",
      "keyword": "Obediencia",
      "significado": "Es cuando se cumplen las reglas y normas que han sido dadas.",
      "verse": "Si ellos aceptan obedecerlo, pasan el resto de su vida felices y con gran prosperidad",
      "cita": "Job 36: 11"
    }
  },
  {
    "page": 3,
    "question": "¿Qué les pasaba a los israelitas cuando desobedecían a Dios?",
    "options": {
      "a": "Se volvían muy felices",
      "b": "Se volvían libres",
      "c": "Eran maltratados y no eran libres",
      "d": "Dios les daba regalos"
    },
    "answer": {
      "letter": "c",
      "text": "Eran maltratados y no eran libres"
    },
    "context": {
      "subject": "Eres especial",
      "title": "La felicidad de obedecer",
      "keyword": "Obediencia",
      "significado": "Es cuando se cumplen las reglas y normas que han sido dadas.",
      "verse": "Si ellos aceptan obedecerlo, pasan el resto de su vida felices y con gran prosperidad",
      "cita": "Job 36: 11"
    }
  },
  {
    "page": 3,
    "question": "¿Qué debían hacer los israelitas para ser sanos y felices?",
    "options": {
      "a": "Comer mucho",
      "b": "Obedecer las órdenes de Dios",
      "c": "Vivir en la oscuridad",
      "d": "Jugar todo el día"
    },
    "answer": {
      "letter": "b",
      "text": "Obedecer las órdenes de Dios"
    },
    "context": {
      "subject": "Eres especial",
      "title": "La felicidad de obedecer",
      "keyword": "Obediencia",
      "significado": "Es cuando se cumplen las reglas y normas que han sido dadas.",
      "verse": "Si ellos aceptan obedecerlo, pasan el resto de su vida felices y con gran prosperidad",
      "cita": "Job 36: 11"
    }
  },
  {
    "page": 3,
    "question": "¿Por qué es importante ser obediente a Dios y a tus padres?",
    "options": {
      "a": "Porque es divertido",
      "b": "Porque nos protege de todo mal",
      "c": "Porque no tenemos que hacer nada más",
      "d": "Porque siempre ganamos premios"
    },
    "answer": {
      "letter": "b",
      "text": "Porque nos protege de todo mal"
    },
    "context": {
      "subject": "Eres especial",
      "title": "La felicidad de obedecer",
      "keyword": "Obediencia",
      "significado": "Es cuando se cumplen las reglas y normas que han sido dadas.",
      "verse": "Si ellos aceptan obedecerlo, pasan el resto de su vida felices y con gran prosperidad",
      "cita": "Job 36: 11"
    }
  },
  {
    "page": 4,
    "question": "¿Cómo podemos conocer a Jesús?",
    "options": {
      "a": "Solo leyendo libros",
      "b": "Solo viendo videos",
      "c": "Por medio de las historias de la Biblia",
      "d": "Solo yendo a la iglesia"
    },
    "answer": {
      "letter": "c",
      "text": "Por medio de las historias de la Biblia"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Qué dicen de Jesús?",
      "keyword": "Testificar",
      "significado": "Es contar algo que hemos visto, oído o sentido.",
      "verse": "Presenten a sus testigos y demuestren que dicen la verdad.",
      "cita": "Isaías 43: 9"
    }
  },
  {
    "page": 4,
    "question": "¿Qué les sucede a las personas cuando conocen a Jesús?",
    "options": {
      "a": "Se sienten tristes todo el tiempo",
      "b": "Les perdona sus errores",
      "c": "Se olvidan de todo",
      "d": "Se hacen muy ricos"
    },
    "answer": {
      "letter": "b",
      "text": "Les perdona sus errores"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Qué dicen de Jesús?",
      "keyword": "Testificar",
      "significado": "Es contar algo que hemos visto, oído o sentido.",
      "verse": "Presenten a sus testigos y demuestren que dicen la verdad.",
      "cita": "Isaías 43: 9"
    }
  },
  {
    "page": 4,
    "question": "¿Qué pensaban algunas personas sobre quién era Jesús?",
    "options": {
      "a": "Que era un rey",
      "b": "Que era Juan el Bautista o Elías",
      "c": "Que era un niño",
      "d": "Que era un mago"
    },
    "answer": {
      "letter": "b",
      "text": "Que era Juan el Bautista o Elías"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Qué dicen de Jesús?",
      "keyword": "Testificar",
      "significado": "Es contar algo que hemos visto, oído o sentido.",
      "verse": "Presenten a sus testigos y demuestren que dicen la verdad.",
      "cita": "Isaías 43: 9"
    }
  },
  {
    "page": 4,
    "question": "¿Qué dijo Pedro cuando Jesús le preguntó qué pensaban sobre él?",
    "options": {
      "a": "'Eres un rey poderoso'",
      "b": "'Eres el hijo del Dios viviente'",
      "c": "'Eres un buen maestro'",
      "d": "'Eres el mejor amigo de todos'"
    },
    "answer": {
      "letter": "b",
      "text": "'Eres el hijo del Dios viviente'"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Qué dicen de Jesús?",
      "keyword": "Testificar",
      "significado": "Es contar algo que hemos visto, oído o sentido.",
      "verse": "Presenten a sus testigos y demuestren que dicen la verdad.",
      "cita": "Isaías 43: 9"
    }
  },
  {
    "page": 5,
    "question": "¿Cuántos discípulos tenía Jesús?",
    "options": {
      "a": "10",
      "b": "11",
      "c": "12",
      "d": "13"
    },
    "answer": {
      "letter": "c",
      "text": "12"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Jesús me hace mejor",
      "keyword": "Comportamiento",
      "significado": "Es la forma en la que respondes ante lo que ocurre a tu alrededor.",
      "verse": "Matías resultó elegido.  Desde ese día, Matías se agregó al grupo de los apóstoles.",
      "cita": "Hechos 1: 26"
    }
  },
  {
    "page": 5,
    "question": "¿Quién reemplazó a Judas Iscariote como discípulo de Jesús?",
    "options": {
      "a": "Pedro",
      "b": "Matías",
      "c": "Felipe",
      "d": "Juan"
    },
    "answer": {
      "letter": "b",
      "text": "Matías"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Jesús me hace mejor",
      "keyword": "Comportamiento",
      "significado": "Es la forma en la que respondes ante lo que ocurre a tu alrededor.",
      "verse": "Matías resultó elegido.  Desde ese día, Matías se agregó al grupo de los apóstoles.",
      "cita": "Hechos 1: 26"
    }
  },
  {
    "page": 5,
    "question": "¿Por qué Judas Iscariote no siguió los consejos de Jesús?",
    "options": {
      "a": "Porque no quería ser discípulo",
      "b": "Porque amaba más el dinero y los bienes materiales que a Jesús",
      "c": "Porque no entendía las enseñanzas de Jesús",
      "d": "Porque no podía caminar"
    },
    "answer": {
      "letter": "b",
      "text": "Porque amaba más el dinero y los bienes materiales que a Jesús"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Jesús me hace mejor",
      "keyword": "Comportamiento",
      "significado": "Es la forma en la que respondes ante lo que ocurre a tu alrededor.",
      "verse": "Matías resultó elegido.  Desde ese día, Matías se agregó al grupo de los apóstoles.",
      "cita": "Hechos 1: 26"
    }
  },
  {
    "page": 5,
    "question": "¿Qué consejo dio Jesús que Judas no siguió?",
    "options": {
      "a": "'No hagas a nadie lo que no deseas para ti'",
      "b": "'Ayuda siempre a tus amigos'",
      "c": "'Siempre di la verdad'",
      "d": "'Haz lo que quieras, sin importar qué'"
    },
    "answer": {
      "letter": "a",
      "text": "'No hagas a nadie lo que no deseas para ti'"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Jesús me hace mejor",
      "keyword": "Comportamiento",
      "significado": "Es la forma en la que respondes ante lo que ocurre a tu alrededor.",
      "verse": "Matías resultó elegido.  Desde ese día, Matías se agregó al grupo de los apóstoles.",
      "cita": "Hechos 1: 26"
    }
  },
  {
    "page": 6,
    "question": "¿Cómo hablamos con Dios según el texto?",
    "options": {
      "a": "Usando cartas",
      "b": "A través de oraciones",
      "c": "Por teléfono",
      "d": "Cuando estamos dormidos"
    },
    "answer": {
      "letter": "b",
      "text": "A través de oraciones"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Padre nuestro",
      "keyword": "Atento",
      "significado": "Es cuando miras, escuchas y percibes algo que ocurre, e ignoras cualquier otra actividad a tu alrededor.",
      "verse": "Ustedes deben orar así: 'Padre nuestro que estás en el cielo'.",
      "cita": "Mateo 6: 9"
    }
  },
  {
    "page": 6,
    "question": "¿Qué sabe solo el Padre Dios cuando oramos en nuestra mente?",
    "options": {
      "a": "Lo que decimos a los demás",
      "b": "Lo que estamos pensando o pidiendo",
      "c": "Lo que comemos",
      "d": "Lo que hacemos todo el día"
    },
    "answer": {
      "letter": "b",
      "text": "Lo que estamos pensando o pidiendo"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Padre nuestro",
      "keyword": "Atento",
      "significado": "Es cuando miras, escuchas y percibes algo que ocurre, e ignoras cualquier otra actividad a tu alrededor.",
      "verse": "Ustedes deben orar así: 'Padre nuestro que estás en el cielo'.",
      "cita": "Mateo 6: 9"
    }
  },
  {
    "page": 6,
    "question": "¿Qué significa cuando todos dicen 'amén' al final de una oración en público?",
    "options": {
      "a": "Que no están de acuerdo",
      "b": "Que todos están cansados",
      "c": "Que todos están de acuerdo con lo que se le está diciendo a Dios",
      "d": "Que están terminando la oración en silencio"
    },
    "answer": {
      "letter": "c",
      "text": "Que todos están de acuerdo con lo que se le está diciendo a Dios"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Padre nuestro",
      "keyword": "Atento",
      "significado": "Es cuando miras, escuchas y percibes algo que ocurre, e ignoras cualquier otra actividad a tu alrededor.",
      "verse": "Ustedes deben orar así: 'Padre nuestro que estás en el cielo'.",
      "cita": "Mateo 6: 9"
    }
  },
  {
    "page": 6,
    "question": "¿En qué nombre oramos siempre?",
    "options": {
      "a": "En el nombre de Pedro",
      "b": "En el nombre de Jesús",
      "c": "En el nombre de los ángeles",
      "d": "En el nombre de la iglesia"
    },
    "answer": {
      "letter": "b",
      "text": "En el nombre de Jesús"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "Padre nuestro",
      "keyword": "Atento",
      "significado": "Es cuando miras, escuchas y percibes algo que ocurre, e ignoras cualquier otra actividad a tu alrededor.",
      "verse": "Ustedes deben orar así: 'Padre nuestro que estás en el cielo'.",
      "cita": "Mateo 6: 9"
    }
  },
  {
    "page": 7,
    "question": "¿Qué representa el perfume especial que se hacía en el Templo de Dios?",
    "options": {
      "a": "Las frutas del campo",
      "b": "Las oraciones que suben hasta Dios",
      "c": "Las flores del jardín",
      "d": "Los colores de la naturaleza"
    },
    "answer": {
      "letter": "b",
      "text": "Las oraciones que suben hasta Dios"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¡Qué buen olor!",
      "keyword": "Agradable",
      "significado": "Es algo que nos gusta y lo percibimos por aguno de nuestros cinco sentidos.",
      "verse": "La ayuda de ustedes fue tan agradable como el suave aroma de las ofrendas que Dios acepta con agrado.",
      "cita": "Filipenses 4: 18"
    }
  },
  {
    "page": 7,
    "question": "¿Qué cosas en la naturaleza tienen olores agradables según el texto?",
    "options": {
      "a": "Las nubes y las montañas",
      "b": "Las frutas, las flores y algunas maderas",
      "c": "Las piedras y los ríos",
      "d": "Las estrellas y la luna"
    },
    "answer": {
      "letter": "b",
      "text": "Las frutas, las flores y algunas maderas"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¡Qué buen olor!",
      "keyword": "Agradable",
      "significado": "Es algo que nos gusta y lo percibimos por aguno de nuestros cinco sentidos.",
      "verse": "La ayuda de ustedes fue tan agradable como el suave aroma de las ofrendas que Dios acepta con agrado.",
      "cita": "Filipenses 4: 18"
    }
  },
  {
    "page": 7,
    "question": "¿Qué hacía Dios cuando terminó la creación y vio que todo era bueno?",
    "options": {
      "a": "Dijo que todo tenía hermosos colores y olores agradables",
      "b": "Solo miró las plantas",
      "c": "Se fue a descansar en un lugar especial",
      "d": "No habló sobre los olores ni colores"
    },
    "answer": {
      "letter": "a",
      "text": "Dijo que todo tenía hermosos colores y olores agradables"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¡Qué buen olor!",
      "keyword": "Agradable",
      "significado": "Es algo que nos gusta y lo percibimos por aguno de nuestros cinco sentidos.",
      "verse": "La ayuda de ustedes fue tan agradable como el suave aroma de las ofrendas que Dios acepta con agrado.",
      "cita": "Filipenses 4: 18"
    }
  },
  {
    "page": 7,
    "question": "¿Cómo podemos imaginar nuestras oraciones para Dios?",
    "options": {
      "a": "Como un sonido fuerte",
      "b": "Como un olor agradable que llega a Dios",
      "c": "Como una luz que brilla mucho",
      "d": "Como un viento que sopla rápido"
    },
    "answer": {
      "letter": "b",
      "text": "Como un olor agradable que llega a Dios"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¡Qué buen olor!",
      "keyword": "Agradable",
      "significado": "Es algo que nos gusta y lo percibimos por aguno de nuestros cinco sentidos.",
      "verse": "La ayuda de ustedes fue tan agradable como el suave aroma de las ofrendas que Dios acepta con agrado.",
      "cita": "Filipenses 4: 18"
    }
  },
  {
    "page": 8,
    "question": "¿Qué tipo de olores había en la naturaleza desde la creación?",
    "options": {
      "a": "Olores de flores, frutas y madera",
      "b": "Olores de comida y juguetes",
      "c": "Olores de carros y edificios",
      "d": "Olores de lluvia y truenos"
    },
    "answer": {
      "letter": "a",
      "text": "Olores de flores, frutas y madera"
    },
    "context": {
      "subject": "Eres especial",
      "title": "Soy de la tierra",
      "keyword": "Minerales",
      "significado": "En la nutrición, son sustancias que el cuerpo necesita para funcionar bien.  En geología, son los materiales que forman las rocas y las piedras.",
      "verse": "A los ojos de Dios, tú y yo somos iguales; estamos hechos de barro.",
      "cita": "Job 33: 6"
    }
  },
  {
    "page": 8,
    "question": "¿Qué hacía el perfume especial que se preparaba en el Templo de Dios?",
    "options": {
      "a": "Aromatizaba las casas de las personas",
      "b": "Representaba las oraciones que suben a Dios",
      "c": "Hacía que el aire se volviera de colores",
      "d": "Era usado para pintar cuadros"
    },
    "answer": {
      "letter": "b",
      "text": "Representaba las oraciones que suben a Dios"
    },
    "context": {
      "subject": "Eres especial",
      "title": "Soy de la tierra",
      "keyword": "Minerales",
      "significado": "En la nutrición, son sustancias que el cuerpo necesita para funcionar bien.  En geología, son los materiales que forman las rocas y las piedras.",
      "verse": "A los ojos de Dios, tú y yo somos iguales; estamos hechos de barro.",
      "cita": "Job 33: 6"
    }
  },
  {
    "page": 8,
    "question": "¿Qué hizo Dios el séptimo día después de terminar la creación?",
    "options": {
      "a": "Creó más animales.",
      "b": "Descansó y bendijo el séptimo día.",
      "c": "Volvió a separar la luz de la oscuridad.",
      "d": "Pintó el cielo de diferentes colores."
    },
    "answer": {
      "letter": "b",
      "text": "Descansó y bendijo el séptimo día."
    },
    "context": {
      "subject": "Eres especial",
      "title": "Soy de la tierra",
      "keyword": "Minerales",
      "significado": "En la nutrición, son sustancias que el cuerpo necesita para funcionar bien.  En geología, son los materiales que forman las rocas y las piedras.",
      "verse": "A los ojos de Dios, tú y yo somos iguales; estamos hechos de barro.",
      "cita": "Job 33: 6"
    }
  },
  {
    "page": 8,
    "question": "¿Qué representan nuestras oraciones para Dios según el texto?",
    "options": {
      "a": "Un sonido fuerte que Dios escucha",
      "b": "Un olor agradable que Dios recibe",
      "c": "Un brillo que ilumina el cielo",
      "d": "Un viento que sopla suavemente"
    },
    "answer": {
      "letter": "b",
      "text": "Un olor agradable que Dios recibe"
    },
    "context": {
      "subject": "Eres especial",
      "title": "Soy de la tierra",
      "keyword": "Minerales",
      "significado": "En la nutrición, son sustancias que el cuerpo necesita para funcionar bien.  En geología, son los materiales que forman las rocas y las piedras.",
      "verse": "A los ojos de Dios, tú y yo somos iguales; estamos hechos de barro.",
      "cita": "Job 33: 6"
    }
  },
  {
    "page": 9,
    "question": "¿Qué hizo el rey cuando los invitados no asistieron a la fiesta de la boda de su hijo?",
    "options": {
      "a": "Canceló la fiesta y se fue a dormir",
      "b": "Envió a sus sirvientes a invitar a otras personas",
      "c": "Guardó toda la comida para otro día",
      "d": "Se puso feliz y bailó solo 54"
    },
    "answer": {
      "letter": "b",
      "text": "Envió a sus sirvientes a invitar a otras personas"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Yo estoy invitado",
      "keyword": "Invitados",
      "significado": "Son personas que deseamos ver en una actividad o celebración porque es importante que participen.",
      "verse": "El rey envió a sus sirvientes para que llamaran a los invitados a la fiesta.",
      "cita": "Mateo 22: 3"
    }
  },
  {
    "page": 9,
    "question": "¿Qué simboliza la gran cena que Jesús nos ha invitado a celebrar?",
    "options": {
      "a": "Una fiesta de cumpleaños",
      "b": "La reunión en el reino de Jesús cuando él regrese",
      "c": "Un festival de música",
      "d": "Una cena familiar en casa"
    },
    "answer": {
      "letter": "b",
      "text": "La reunión en el reino de Jesús cuando él regrese"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Yo estoy invitado",
      "keyword": "Invitados",
      "significado": "Son personas que deseamos ver en una actividad o celebración porque es importante que participen.",
      "verse": "El rey envió a sus sirvientes para que llamaran a los invitados a la fiesta.",
      "cita": "Mateo 22: 3"
    }
  },
  {
    "page": 9,
    "question": "¿Cómo se sintió el rey cuando los invitados no quisieron ir a la fiesta?",
    "options": {
      "a": "Muy feliz",
      "b": "Enojado y triste",
      "c": "Indiferente",
      "d": "Asustado"
    },
    "answer": {
      "letter": "b",
      "text": "Enojado y triste"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Yo estoy invitado",
      "keyword": "Invitados",
      "significado": "Son personas que deseamos ver en una actividad o celebración porque es importante que participen.",
      "verse": "El rey envió a sus sirvientes para que llamaran a los invitados a la fiesta.",
      "cita": "Mateo 22: 3"
    }
  },
  {
    "page": 9,
    "question": "¿Qué podemos hacer para prepararnos para la gran cena que Jesús ha prometido?",
    "options": {
      "a": "Aceptar la invitación de Jesús",
      "b": "Comprar regalos para todos",
      "c": "Comer mucha comida antes de ir",
      "d": "Construir una casa inflable"
    },
    "answer": {
      "letter": "a",
      "text": "Aceptar la invitación de Jesús"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Yo estoy invitado",
      "keyword": "Invitados",
      "significado": "Son personas que deseamos ver en una actividad o celebración porque es importante que participen.",
      "verse": "El rey envió a sus sirvientes para que llamaran a los invitados a la fiesta.",
      "cita": "Mateo 22: 3"
    }
  },
  {
    "page": 10,
    "question": "¿Cuándo regresará Jesús a la tierra?",
    "options": {
      "a": "Mañana por la mañana",
      "b": "Es una sorpresa, nadie lo sabe",
      "c": "Cuando los ángeles lo digan",
      "d": "En el próximo cumpleaños de Jesús"
    },
    "answer": {
      "letter": "b",
      "text": "Es una sorpresa, nadie lo sabe"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Yo soy misionero",
      "keyword": "Discípulos",
      "significado": "Son los que aprenden de Jesús y cumplen la misión.",
      "verse": "En la casa de mi Padre hay lugar para todos.",
      "cita": "Juan 14: 2"
    }
  },
  {
    "page": 10,
    "question": "¿Qué es un misionero según el texto?",
    "options": {
      "a": "Una persona que viaja por diversión",
      "b": "Alguien que lleva la buena noticia de la salvación",
      "c": "Un maestro de escuela",
      "d": "Una persona que escribe libros"
    },
    "answer": {
      "letter": "b",
      "text": "Alguien que lleva la buena noticia de la salvación"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Yo soy misionero",
      "keyword": "Discípulos",
      "significado": "Son los que aprenden de Jesús y cumplen la misión.",
      "verse": "En la casa de mi Padre hay lugar para todos.",
      "cita": "Juan 14: 2"
    }
  },
  {
    "page": 10,
    "question": "¿Por qué Jesús quiere que haya más misioneros en el mundo?",
    "options": {
      "a": "Porque el mundo es grande y hay muchas personas que necesitan conocer a Jesús",
      "b": "Para que los misioneros hagan fiestas en la iglesia",
      "c": "Para que los misioneros repartan regalos",
      "d": "Para que los ángeles tengan más amigos"
    },
    "answer": {
      "letter": "a",
      "text": "Porque el mundo es grande y hay muchas personas que necesitan conocer a Jesús"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Yo soy misionero",
      "keyword": "Discípulos",
      "significado": "Son los que aprenden de Jesús y cumplen la misión.",
      "verse": "En la casa de mi Padre hay lugar para todos.",
      "cita": "Juan 14: 2"
    }
  },
  {
    "page": 10,
    "question": "¿Qué podemos hacer para ayudar a los misioneros?",
    "options": {
      "a": "Llevar ofrendas misioneras y ayudar en la iglesia",
      "b": "Hacer dibujos de los misioneros",
      "c": "Guardar silencio en casa",
      "d": "Cocinar mucha comida para los misioneros"
    },
    "answer": {
      "letter": "a",
      "text": "Llevar ofrendas misioneras y ayudar en la iglesia"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Yo soy misionero",
      "keyword": "Discípulos",
      "significado": "Son los que aprenden de Jesús y cumplen la misión.",
      "verse": "En la casa de mi Padre hay lugar para todos.",
      "cita": "Juan 14: 2"
    }
  },
  {
    "page": 11,
    "question": "¿Quién fue elegida por Dios para ser la madre de Jesús?",
    "options": {
      "a": "Ester",
      "b": "María",
      "c": "Sara",
      "d": "Débora"
    },
    "answer": {
      "letter": "b",
      "text": "María"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "La familia de Jesús",
      "keyword": "Tu nombre",
      "significado": "Es la palabra con la cual nos referimos a ti, y te distingue dentro de un grupo.  Tu apellido nos dice a qué familia perteneces.",
      "verse": "Jesús era descendiente de David y de Abraham.",
      "cita": "Mateo 1: 1"
    }
  },
  {
    "page": 11,
    "question": "¿De quién descendía José, el padre terrenal de Jesús?",
    "options": {
      "a": "De los profetas",
      "b": "De los reyes que descendían del rey David",
      "c": "De los carpinteros del Templo",
      "d": "De los soldados de Israel"
    },
    "answer": {
      "letter": "b",
      "text": "De los reyes que descendían del rey David"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "La familia de Jesús",
      "keyword": "Tu nombre",
      "significado": "Es la palabra con la cual nos referimos a ti, y te distingue dentro de un grupo.  Tu apellido nos dice a qué familia perteneces.",
      "verse": "Jesús era descendiente de David y de Abraham.",
      "cita": "Mateo 1: 1"
    }
  },
  {
    "page": 11,
    "question": "¿Cuántas líneas familiares se dibujan para llegar desde el rey David hasta Jesús?",
    "options": {
      "a": "10 líneas",
      "b": "15 líneas",
      "c": "28 líneas",
      "d": "40 líneas"
    },
    "answer": {
      "letter": "c",
      "text": "28 líneas"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "La familia de Jesús",
      "keyword": "Tu nombre",
      "significado": "Es la palabra con la cual nos referimos a ti, y te distingue dentro de un grupo.  Tu apellido nos dice a qué familia perteneces.",
      "verse": "Jesús era descendiente de David y de Abraham.",
      "cita": "Mateo 1: 1"
    }
  },
  {
    "page": 11,
    "question": "¿Por qué Jesús es un rey y también un sacerdote?",
    "options": {
      "a": "Porque vivió en un castillo",
      "b": "Porque desciende de la familia de reyes y sacerdotes",
      "c": "Porque escribía canciones como el rey David",
      "d": "Porque construyó el Templo"
    },
    "answer": {
      "letter": "b",
      "text": "Porque desciende de la familia de reyes y sacerdotes"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "La familia de Jesús",
      "keyword": "Tu nombre",
      "significado": "Es la palabra con la cual nos referimos a ti, y te distingue dentro de un grupo.  Tu apellido nos dice a qué familia perteneces.",
      "verse": "Jesús era descendiente de David y de Abraham.",
      "cita": "Mateo 1: 1"
    }
  },
  {
    "page": 12,
    "question": "¿Quién fue el creador de todos los animales, según el texto bíblico de hoy? (Génesis 1: 25).",
    "options": {
      "a": "Los seres humanos",
      "b": "Dios",
      "c": "Jonás",
      "d": "Los ecosissubjects 57"
    },
    "answer": {
      "letter": "b",
      "text": "Dios"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "También los animales",
      "keyword": "Arrepentirse",
      "significado": "Es cuando te sientes muy triste por algo malo que hiciste o decides no hacer algo que habías pensado.",
      "verse": "Dios hizo los animales salvajes, los animales domésticos, los reptiles y los insectos.",
      "cita": "Génesis 1: 25"
    }
  },
  {
    "page": 12,
    "question": "¿Por qué Dios envió a Jonás a Nínive?",
    "options": {
      "a": "Para destruir la ciudad",
      "b": "Para dar un mensaje y ayudar a las personas a arrepentirse",
      "c": "Para construir una casa para los animales",
      "d": "Para plantar árboles en la ciudad"
    },
    "answer": {
      "letter": "b",
      "text": "Para dar un mensaje y ayudar a las personas a arrepentirse"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "También los animales",
      "keyword": "Arrepentirse",
      "significado": "Es cuando te sientes muy triste por algo malo que hiciste o decides no hacer algo que habías pensado.",
      "verse": "Dios hizo los animales salvajes, los animales domésticos, los reptiles y los insectos.",
      "cita": "Génesis 1: 25"
    }
  },
  {
    "page": 12,
    "question": "¿Cuántas personas vivían en la ciudad de Nínive, según la historia?",
    "options": {
      "a": "Mil personas",
      "b": "Cincuenta mil personas",
      "c": "Ciento veinte mil personas",
      "d": "Un millón de personas"
    },
    "answer": {
      "letter": "c",
      "text": "Ciento veinte mil personas"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "También los animales",
      "keyword": "Arrepentirse",
      "significado": "Es cuando te sientes muy triste por algo malo que hiciste o decides no hacer algo que habías pensado.",
      "verse": "Dios hizo los animales salvajes, los animales domésticos, los reptiles y los insectos.",
      "cita": "Génesis 1: 25"
    }
  },
  {
    "page": 12,
    "question": "¿Qué nos enseña la historia sobre cómo Dios cuida a su creación?",
    "options": {
      "a": "Que Dios solo cuida a los seres humanos",
      "b": "Que Dios ama y protege tanto a las personas como a los animales y plantas",
      "c": "Que los animales no son importantes para Dios",
      "d": "Que Dios no envía mensajes a las personas"
    },
    "answer": {
      "letter": "b",
      "text": "Que Dios ama y protege tanto a las personas como a los animales y plantas"
    },
    "context": {
      "subject": "Observa la creación",
      "title": "También los animales",
      "keyword": "Arrepentirse",
      "significado": "Es cuando te sientes muy triste por algo malo que hiciste o decides no hacer algo que habías pensado.",
      "verse": "Dios hizo los animales salvajes, los animales domésticos, los reptiles y los insectos.",
      "cita": "Génesis 1: 25"
    }
  },
  {
    "page": 13,
    "question": "¿Qué es la Biblia?",
    "options": {
      "a": "Una carta",
      "b": "Una biblioteca con muchos libros",
      "c": "Un diccionario",
      "d": "Una novela"
    },
    "answer": {
      "letter": "b",
      "text": "Una biblioteca con muchos libros"
    },
    "context": {
      "subject": "Eres especial",
      "title": "En la tierra nueva",
      "keyword": "Futuro",
      "significado": "Es referirse al después de ahora, donde los hechos no  han ocurrido todavía.",
      "verse": "Después vi un cielo nuevo y una tierra nueva.",
      "cita": "Apocalipsis 21: 1"
    }
  },
  {
    "page": 13,
    "question": "¿Por qué la Biblia es llamada la Palabra de Dios?",
    "options": {
      "a": "Porque Dios escribió todos los libros",
      "b": "Porque los escritores fueron inspirados por Dios para escribir",
      "c": "Porque habla solo de ángeles",
      "d": "Porque tiene historias de animales"
    },
    "answer": {
      "letter": "b",
      "text": "Porque los escritores fueron inspirados por Dios para escribir"
    },
    "context": {
      "subject": "Eres especial",
      "title": "En la tierra nueva",
      "keyword": "Futuro",
      "significado": "Es referirse al después de ahora, donde los hechos no  han ocurrido todavía.",
      "verse": "Después vi un cielo nuevo y una tierra nueva.",
      "cita": "Apocalipsis 21: 1"
    }
  },
  {
    "page": 13,
    "question": "¿Qué podemos aprender gracias a la Biblia?",
    "options": {
      "a": "Cómo fue la creación y lo que ocurrió después de que Adán y Eva desobedecieran",
      "b": "Los nombres de todos los animales",
      "c": "Cómo se construyen las casas",
      "d": "Cómo hacer recetas de cocina"
    },
    "answer": {
      "letter": "a",
      "text": "Cómo fue la creación y lo que ocurrió después de que Adán y Eva desobedecieran"
    },
    "context": {
      "subject": "Eres especial",
      "title": "En la tierra nueva",
      "keyword": "Futuro",
      "significado": "Es referirse al después de ahora, donde los hechos no  han ocurrido todavía.",
      "verse": "Después vi un cielo nuevo y una tierra nueva.",
      "cita": "Apocalipsis 21: 1"
    }
  },
  {
    "page": 13,
    "question": "¿Qué ocurrirá cuando Jesús regrese?",
    "options": {
      "a": "Todas las personas recibirán regalos de cumpleaños",
      "b": "Jesús traerá el regalo de la salvación para los que pidieron ser perdonados",
      "c": "Habrá una gran tormenta",
      "d": "Todas las personas viajarán al espacio"
    },
    "answer": {
      "letter": "b",
      "text": "Jesús traerá el regalo de la salvación para los que pidieron ser perdonados"
    },
    "context": {
      "subject": "Eres especial",
      "title": "En la tierra nueva",
      "keyword": "Futuro",
      "significado": "Es referirse al después de ahora, donde los hechos no  han ocurrido todavía.",
      "verse": "Después vi un cielo nuevo y una tierra nueva.",
      "cita": "Apocalipsis 21: 1"
    }
  },
  {
    "page": 14,
    "question": "¿Por qué el día del regreso de Jesús es una sorpresa?",
    "options": {
      "a": "Porque nadie sabe cuándo será, ni siquiera los ángeles",
      "b": "Porque será en Navidad",
      "c": "Porque Jesús olvidó decir la fecha",
      "d": "Porque siempre llueve ese día"
    },
    "answer": {
      "letter": "a",
      "text": "Porque nadie sabe cuándo será, ni siquiera los ángeles"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Cuándo regresa Jesús?",
      "keyword": "Oportunidad",
      "significado": "Es estar a tiempo y tener la facilidad para lograr algo bueno.",
      "verse": "El que anuncia estas cosas dice: 'Les aseguro que vengo pronto'.",
      "cita": "Apocalipsis 22: 20"
    }
  },
  {
    "page": 14,
    "question": "¿Qué significa que para Dios un día es como mil años?",
    "options": {
      "a": "Que el tiempo de Dios es diferente al de los seres humanos",
      "b": "Que un día dura más horas en el cielo",
      "c": "Que Dios no sabe qué hora es",
      "d": "Que un día en el cielo es igual a un día en la tierra"
    },
    "answer": {
      "letter": "a",
      "text": "Que el tiempo de Dios es diferente al de los seres humanos"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Cuándo regresa Jesús?",
      "keyword": "Oportunidad",
      "significado": "Es estar a tiempo y tener la facilidad para lograr algo bueno.",
      "verse": "El que anuncia estas cosas dice: 'Les aseguro que vengo pronto'.",
      "cita": "Apocalipsis 22: 20"
    }
  },
  {
    "page": 14,
    "question": "¿Qué insecto vive solo un día?",
    "options": {
      "a": "La abeja",
      "b": "La efímera",
      "c": "La mariposa",
      "d": "El grillo"
    },
    "answer": {
      "letter": "b",
      "text": "La efímera"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Cuándo regresa Jesús?",
      "keyword": "Oportunidad",
      "significado": "Es estar a tiempo y tener la facilidad para lograr algo bueno.",
      "verse": "El que anuncia estas cosas dice: 'Les aseguro que vengo pronto'.",
      "cita": "Apocalipsis 22: 20"
    }
  },
  {
    "page": 14,
    "question": "¿Por qué algunas personas piensan que Jesús está tardando en regresar?",
    "options": {
      "a": "Porque se olvidan de que el tiempo de Dios es diferente",
      "b": "Porque no han leído la Biblia",
      "c": "Porque no saben contar los días",
      "d": "Porque creen que Jesús está ocupado"
    },
    "answer": {
      "letter": "a",
      "text": "Porque se olvidan de que el tiempo de Dios es diferente"
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "¿Cuándo regresa Jesús?",
      "keyword": "Oportunidad",
      "significado": "Es estar a tiempo y tener la facilidad para lograr algo bueno.",
      "verse": "El que anuncia estas cosas dice: 'Les aseguro que vengo pronto'.",
      "cita": "Apocalipsis 22: 20"
    }
  },
  {
    "page": 15,
    "question": "¿Por qué es importante llevar el evangelio?",
    "options": {
      "a": "Porque amas a Jesús y obedeces cumpliendo la misión.",
      "b": "Porque es divertido.",
      "c": "Porque a las personas les gusta escuchar historias.",
      "d": "Porque siempre es lo correcto."
    },
    "answer": {
      "letter": "a",
      "text": "Porque amas a Jesús y obedeces cumpliendo la misión."
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Llevo un mensaje",
      "keyword": "Evangelio",
      "significado": "Significa buenas noticias.  Se refiere al mensaje sobre la vida y la muerte de Jesús para salvar a las personas.",
      "verse": "Así nadie podrá hablar mal del mensaje de Dios.",
      "cita": "Tito 2: 5"
    }
  },
  {
    "page": 15,
    "question": "¿Qué hizo Noé cuando las personas se burlaban de él?",
    "options": {
      "a": "Se detuvo y no construyó más el arca.",
      "b": "Siguió construyendo el arca, porque creía en Dios.",
      "c": "Se fue a otro lugar donde nadie lo molestara.",
      "d": "Les gritó que no se burlaran."
    },
    "answer": {
      "letter": "b",
      "text": "Siguió construyendo el arca, porque creía en Dios."
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Llevo un mensaje",
      "keyword": "Evangelio",
      "significado": "Significa buenas noticias.  Se refiere al mensaje sobre la vida y la muerte de Jesús para salvar a las personas.",
      "verse": "Así nadie podrá hablar mal del mensaje de Dios.",
      "cita": "Tito 2: 5"
    }
  },
  {
    "page": 15,
    "question": "¿Qué mostraba Noé con sus acciones?",
    "options": {
      "a": "Que creía en Dios y obedecía sus mandamientos.",
      "b": "Que quería ser famoso por construir el arca.",
      "c": "Que se sentía triste por las burlas.",
      "d": "Que quería demostrar que era el más fuerte."
    },
    "answer": {
      "letter": "a",
      "text": "Que creía en Dios y obedecía sus mandamientos."
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Llevo un mensaje",
      "keyword": "Evangelio",
      "significado": "Significa buenas noticias.  Se refiere al mensaje sobre la vida y la muerte de Jesús para salvar a las personas.",
      "verse": "Así nadie podrá hablar mal del mensaje de Dios.",
      "cita": "Tito 2: 5"
    }
  },
  {
    "page": 15,
    "question": "¿Qué frase podemos practicar para hablarles a otros del futuro?",
    "options": {
      "a": "'Si Dios quiere, y si Jesús aún no ha venido.'",
      "b": "'Pronto vendrá un gran rey a la tierra.'",
      "c": "'Nos vamos a ir al cielo sin esperar.'",
      "d": "'Jesús vendrá y nos traerá dulces.'"
    },
    "answer": {
      "letter": "a",
      "text": "'Si Dios quiere, y si Jesús aún no ha venido.'"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Llevo un mensaje",
      "keyword": "Evangelio",
      "significado": "Significa buenas noticias.  Se refiere al mensaje sobre la vida y la muerte de Jesús para salvar a las personas.",
      "verse": "Así nadie podrá hablar mal del mensaje de Dios.",
      "cita": "Tito 2: 5"
    }
  },
  {
    "page": 16,
    "question": "¿Qué se observa en un lugar donde se sirve comida?",
    "options": {
      "a": "Las mesas están desordenadas y las sillas no tienen cojines.",
      "b": "La comida se sirve en platos limpios, las mesas tienen cubiertos en orden y servilletas.",
      "c": "Las mesas están vacías y no hay comida.",
      "d": "Las personas no usan cubiertos, solo comen con las manos."
    },
    "answer": {
      "letter": "b",
      "text": "La comida se sirve en platos limpios, las mesas tienen cubiertos en orden y servilletas. 61"
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "El Rey lavó mis pies",
      "keyword": "Servicio",
      "significado": "Es cuando haces algo para alguien que lo necesita y no lo puede hacer por sí mismo.",
      "verse": "Yo, el hijo del hombre, lo hago así.  No vine a este mundo para que me sirvan, sino para servir a los",
      "cita": "Mateo 20: 28"
    }
  },
  {
    "page": 16,
    "question": "¿Qué tipo de servicios existen?",
    "options": {
      "a": "Solo los médicos y enfermeras dan servicio.",
      "b": "Los servicios son solo los que nos cobran dinero.",
      "c": "Existen muchos servicios como los que brindan médicos, enfermeras y bomberos.",
      "d": "No existen más servicios, solo los que se pagan."
    },
    "answer": {
      "letter": "c",
      "text": "Existen muchos servicios como los que brindan médicos, enfermeras y bomberos."
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "El Rey lavó mis pies",
      "keyword": "Servicio",
      "significado": "Es cuando haces algo para alguien que lo necesita y no lo puede hacer por sí mismo.",
      "verse": "Yo, el hijo del hombre, lo hago así.  No vine a este mundo para que me sirvan, sino para servir a los",
      "cita": "Mateo 20: 28"
    }
  },
  {
    "page": 16,
    "question": "¿Cómo se llama el tipo de servicio que se hace sin esperar dinero o regalos?",
    "options": {
      "a": "Servicio voluntario.",
      "b": "Servicio obligado.",
      "c": "Servicio sin importancia.",
      "d": "Servicio de pago."
    },
    "answer": {
      "letter": "a",
      "text": "Servicio voluntario."
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "El Rey lavó mis pies",
      "keyword": "Servicio",
      "significado": "Es cuando haces algo para alguien que lo necesita y no lo puede hacer por sí mismo.",
      "verse": "Yo, el hijo del hombre, lo hago así.  No vine a este mundo para que me sirvan, sino para servir a los",
      "cita": "Mateo 20: 28"
    }
  },
  {
    "page": 16,
    "question": "¿Qué hizo Jesús para enseñar sobre el servicio?",
    "options": {
      "a": "Les pidió a sus discípulos que lo sirvieran.",
      "b": "Lavó los pies de sus discípulos.",
      "c": "Les regaló una fiesta.",
      "d": "Les dio dinero para que compraran comida."
    },
    "answer": {
      "letter": "b",
      "text": "Lavó los pies de sus discípulos."
    },
    "context": {
      "subject": "Conoce a Jesús",
      "title": "El Rey lavó mis pies",
      "keyword": "Servicio",
      "significado": "Es cuando haces algo para alguien que lo necesita y no lo puede hacer por sí mismo.",
      "verse": "Yo, el hijo del hombre, lo hago así.  No vine a este mundo para que me sirvan, sino para servir a los",
      "cita": "Mateo 20: 28"
    }
  },
  {
    "page": 17,
    "question": "¿Qué animales creó Dios el sexto día?",
    "options": {
      "a": "Solo animales del mar.",
      "b": "Solo animales terrestres.",
      "c": "Animales terrestres y aves.",
      "d": "Animales terrestres y marinos."
    },
    "answer": {
      "letter": "b",
      "text": "Solo animales terrestres."
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¿Qué comerá el león?",
      "keyword": "Hervíboros",
      "significado": "Son los animales que se alimentan de vegetales, sobre todo hierbas.",
      "verse": "La hierba verde será para todos los animales.",
      "cita": "Génesis 1: 30"
    }
  },
  {
    "page": 17,
    "question": "¿Qué comían todos los animales cuando Dios los creó?",
    "options": {
      "a": "Carnes.",
      "b": "Hierba.",
      "c": "Frutas.",
      "d": "Insectos."
    },
    "answer": {
      "letter": "b",
      "text": "Hierba."
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¿Qué comerá el león?",
      "keyword": "Hervíboros",
      "significado": "Son los animales que se alimentan de vegetales, sobre todo hierbas.",
      "verse": "La hierba verde será para todos los animales.",
      "cita": "Génesis 1: 30"
    }
  },
  {
    "page": 17,
    "question": "¿Por qué la vaca no tiene miedo del león cuando se acerca?",
    "options": {
      "a": "Porque el león no es su enemigo.",
      "b": "Porque el león es su amigo.",
      "c": "Porque en ese momento todos los animales comían hierba, no se comían unos a otros.",
      "d": "Porque la vaca es más grande que el león."
    },
    "answer": {
      "letter": "c",
      "text": "Porque en ese momento todos los animales comían hierba, no se comían unos a otros."
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¿Qué comerá el león?",
      "keyword": "Hervíboros",
      "significado": "Son los animales que se alimentan de vegetales, sobre todo hierbas.",
      "verse": "La hierba verde será para todos los animales.",
      "cita": "Génesis 1: 30"
    }
  },
  {
    "page": 17,
    "question": "¿Qué promete Isaías 11:6-7 sobre los animales en la tierra nueva?",
    "options": {
      "a": "El león comerá carne de otros animales.",
      "b": "Los animales se pelearán por la comida.",
      "c": "Los animales serán amigos y descansarán juntos.",
      "d": "Los animales no vivirán en la tierra nueva."
    },
    "answer": {
      "letter": "c",
      "text": "Los animales serán amigos y descansarán juntos."
    },
    "context": {
      "subject": "Observa la creación",
      "title": "¿Qué comerá el león?",
      "keyword": "Hervíboros",
      "significado": "Son los animales que se alimentan de vegetales, sobre todo hierbas.",
      "verse": "La hierba verde será para todos los animales.",
      "cita": "Génesis 1: 30"
    }
  },
  {
    "page": 18,
    "question": "¿Qué quería hacer el apóstol Pablo en sus viajes misioneros?",
    "options": {
      "a": "Traer comida y ropa a todas las personas.",
      "b": "Viajar por diversión.",
      "c": "Llevar la buena noticia de la salvación a todo el mundo.",
      "d": "Hacer dinero con sus viajes."
    },
    "answer": {
      "letter": "c",
      "text": "Llevar la buena noticia de la salvación a todo el mundo."
    },
    "context": {
      "subject": "Eres especial",
      "title": "La alegría de dar dar - 1a parte",
      "keyword": "Satisfecho",
      "significado": "Es cuando te sientes bien porque se ha cumplido un deseo o se ha resuelto una necesidad.",
      "verse": "Recuerden lo que nos dijo el Señor Jesús: 'Dios bendice más al que da que al que recibe'.",
      "cita": "Hechos 20: 35"
    }
  },
  {
    "page": 18,
    "question": "¿Qué hizo Pablo durante el tiempo que estuvo en Éfeso?",
    "options": {
      "a": "Se quedó sin hacer nada.",
      "b": "Enseñó a las personas sobre cómo vivir para agradar a Dios.",
      "c": "Fue a vacaciones.",
      "d": "Sólo trabajó para ganar dinero."
    },
    "answer": {
      "letter": "b",
      "text": "Enseñó a las personas sobre cómo vivir para agradar a Dios."
    },
    "context": {
      "subject": "Eres especial",
      "title": "La alegría de dar dar - 1a parte",
      "keyword": "Satisfecho",
      "significado": "Es cuando te sientes bien porque se ha cumplido un deseo o se ha resuelto una necesidad.",
      "verse": "Recuerden lo que nos dijo el Señor Jesús: 'Dios bendice más al que da que al que recibe'.",
      "cita": "Hechos 20: 35"
    }
  },
  {
    "page": 18,
    "question": "¿Por qué Pablo no pidió comida o ropa durante su tiempo en Éfeso?",
    "options": {
      "a": "Porque no tenía dinero.",
      "b": "Porque quería que las personas le dieran lo que necesitaba.",
      "c": "Porque trabajó con sus propias manos para dar ejemplo.",
      "d": "Porque no quería recibir ayuda de nadie."
    },
    "answer": {
      "letter": "c",
      "text": "Porque trabajó con sus propias manos para dar ejemplo."
    },
    "context": {
      "subject": "Eres especial",
      "title": "La alegría de dar dar - 1a parte",
      "keyword": "Satisfecho",
      "significado": "Es cuando te sientes bien porque se ha cumplido un deseo o se ha resuelto una necesidad.",
      "verse": "Recuerden lo que nos dijo el Señor Jesús: 'Dios bendice más al que da que al que recibe'.",
      "cita": "Hechos 20: 35"
    }
  },
  {
    "page": 18,
    "question": "¿Qué consejo de Jesús recordó Pablo a sus amigos?",
    "options": {
      "a": "Ayudar a los demás y trabajar duro.",
      "b": "Pedir ayuda a otros siempre.",
      "c": "Viajar mucho por el mundo.",
      "d": "No hablar de Dios."
    },
    "answer": {
      "letter": "a",
      "text": "Ayudar a los demás y trabajar duro."
    },
    "context": {
      "subject": "Eres especial",
      "title": "La alegría de dar dar - 1a parte",
      "keyword": "Satisfecho",
      "significado": "Es cuando te sientes bien porque se ha cumplido un deseo o se ha resuelto una necesidad.",
      "verse": "Recuerden lo que nos dijo el Señor Jesús: 'Dios bendice más al que da que al que recibe'.",
      "cita": "Hechos 20: 35"
    }
  },
  {
    "page": 19,
    "question": "¿Qué le pedimos a Dios en la oración que Jesús enseñó?",
    "options": {
      "a": "Que nos dé los alimentos que necesitamos para el día.",
      "b": "Que nos dé ropa nueva.",
      "c": "Que nos lleve al cielo.",
      "d": "Que nos dé muchos juguetes."
    },
    "answer": {
      "letter": "a",
      "text": "Que nos dé los alimentos que necesitamos para el día. 64"
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Dios provee",
      "keyword": "Sustento",
      "significado": "Es todo lo que necesita una persona para suplir sus necesidades básicas, como un lugar donde vivir, alimento y ropa.",
      "verse": "Danos la comida que necesitamos hoy.",
      "cita": "Mateo 6: 11"
    }
  },
  {
    "page": 19,
    "question": "¿De qué maneras Dios provee el sustento a las personas?",
    "options": {
      "a": "A través de ayuda de los animales.",
      "b": "A través de lluvia y sol para que las plantas crezcan, y también mediante trabajos y donaciones.",
      "c": "Solo a través de comida en la casa.",
      "d": "Solo con oro y dinero."
    },
    "answer": {
      "letter": "b",
      "text": "A través de lluvia y sol para que las plantas crezcan, y también mediante trabajos y donaciones."
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Dios provee",
      "keyword": "Sustento",
      "significado": "Es todo lo que necesita una persona para suplir sus necesidades básicas, como un lugar donde vivir, alimento y ropa.",
      "verse": "Danos la comida que necesitamos hoy.",
      "cita": "Mateo 6: 11"
    }
  },
  {
    "page": 19,
    "question": "¿Por qué es importante que todos aprendamos algún oficio o trabajo?",
    "options": {
      "a": "Para tener mucho dinero.",
      "b": "Para poder ayudar a los demás y servir a Dios.",
      "c": "Para descansar todo el día.",
      "d": "Para ser famosos."
    },
    "answer": {
      "letter": "b",
      "text": "Para poder ayudar a los demás y servir a Dios."
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Dios provee",
      "keyword": "Sustento",
      "significado": "Es todo lo que necesita una persona para suplir sus necesidades básicas, como un lugar donde vivir, alimento y ropa.",
      "verse": "Danos la comida que necesitamos hoy.",
      "cita": "Mateo 6: 11"
    }
  },
  {
    "page": 19,
    "question": "¿Cómo pueden ayudar los niños en la casa?",
    "options": {
      "a": "Descansando todo el día.",
      "b": "Haciendo labores en el hogar para ayudar a los adultos.",
      "c": "Jugando siempre.",
      "d": "Solo cuidando a los animales."
    },
    "answer": {
      "letter": "b",
      "text": "Haciendo labores en el hogar para ayudar a los adultos."
    },
    "context": {
      "subject": "Los que te rodean",
      "title": "Dios provee",
      "keyword": "Sustento",
      "significado": "Es todo lo que necesita una persona para suplir sus necesidades básicas, como un lugar donde vivir, alimento y ropa.",
      "verse": "Danos la comida que necesitamos hoy.",
      "cita": "Mateo 6: 11"
    }
  },
  {
    "page": 20,
    "question": "¿Qué problema tenía el hombre que vivía en el cementerio?",
    "options": {
      "a": "Estaba perdido en el lago.",
      "b": "Tenía espíritus malos que lo molestaban y lo hacían sufrir.",
      "c": "No podía caminar.",
      "d": "Estaba enfermo de fiebre."
    },
    "answer": {
      "letter": "b",
      "text": "Tenía espíritus malos que lo molestaban y lo hacían sufrir."
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Lo que Jesús hizo en mí",
      "keyword": "Espíritu",
      "significado": "Se le llama a un ser inteligente pero que no tiene un cuerpo que puedas tocar.  Así son los ángeles y el Espíritu Santo.",
      "verse": "Las personas que vieron cómo Jesús había sanado a aquel hombre empezaron a contárselo a todo el",
      "cita": "Marcos 5: 16"
    }
  },
  {
    "page": 20,
    "question": "¿Qué hizo Jesús para ayudar al hombre del cementerio?",
    "options": {
      "a": "Le dio comida.",
      "b": "Le dio un regalo.",
      "c": "Con una orden, hizo que los espíritus malos huyeran y dejó al hombre en paz.",
      "d": "Lo llevó a su casa."
    },
    "answer": {
      "letter": "c",
      "text": "Con una orden, hizo que los espíritus malos huyeran y dejó al hombre en paz."
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Lo que Jesús hizo en mí",
      "keyword": "Espíritu",
      "significado": "Se le llama a un ser inteligente pero que no tiene un cuerpo que puedas tocar.  Así son los ángeles y el Espíritu Santo.",
      "verse": "Las personas que vieron cómo Jesús había sanado a aquel hombre empezaron a contárselo a todo el",
      "cita": "Marcos 5: 16"
    }
  },
  {
    "page": 20,
    "question": "¿Cómo reaccionaron las personas del pueblo cuando Jesús ayudó al hombre?",
    "options": {
      "a": "Se pusieron felices y agradecidos.",
      "b": "Le pidieron a Jesús que se fuera.",
      "c": "Quisieron ayudar a Jesús.",
      "d": "Se fueron a celebrar."
    },
    "answer": {
      "letter": "b",
      "text": "Le pidieron a Jesús que se fuera."
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Lo que Jesús hizo en mí",
      "keyword": "Espíritu",
      "significado": "Se le llama a un ser inteligente pero que no tiene un cuerpo que puedas tocar.  Así son los ángeles y el Espíritu Santo.",
      "verse": "Las personas que vieron cómo Jesús había sanado a aquel hombre empezaron a contárselo a todo el",
      "cita": "Marcos 5: 16"
    }
  },
  {
    "page": 20,
    "question": "¿Qué le pidió Jesús al hombre después de sanarlo?",
    "options": {
      "a": "Que fuera con Él.",
      "b": "Que contara a sus amigos y familiares lo bueno que Dios había hecho por él.",
      "c": "Que se quedara callado.",
      "d": "Que diera una fiesta."
    },
    "answer": {
      "letter": "b",
      "text": "Que contara a sus amigos y familiares lo bueno que Dios había hecho por él."
    },
    "context": {
      "subject": "Tu regalo especial",
      "title": "Lo que Jesús hizo en mí",
      "keyword": "Espíritu",
      "significado": "Se le llama a un ser inteligente pero que no tiene un cuerpo que puedas tocar.  Así son los ángeles y el Espíritu Santo.",
      "verse": "Las personas que vieron cómo Jesús había sanado a aquel hombre empezaron a contárselo a todo el",
      "cita": "Marcos 5: 16"
    }
  }
]

export async function GET() {
  return NextResponse.json(quizData)
}

