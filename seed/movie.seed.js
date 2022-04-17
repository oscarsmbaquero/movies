// Archivo character.seed.js

import mongoose from 'mongoose';

// Imporatmos el modelo Pet en este nuevo archivo.
import { Movie } from '../models/Movie.js';

const movie = [
    {
        title: 'Matrix',
        director: 'Hermanas Wachowski',
        year: 1999,
        genre: 'Acción',
      },
      {
        title: 'El padrino',
        director: ' Francis Ford Coppola',
        year: 1972,
        genre: 'Drama',
      },
      {
        title: 'En el nombre del Padre',
        director: 'Jim Sheridan',
        year: 1993,
        genre: 'Drama',
      },
      {
        title: 'Airbag',
        director: '	Juanma Bajo Ulloa',
        year: 1997,
        genre: 'Comedy',
      },
      {
        title: 'El expreso de media noche',
        director: 'Alan Parker',
        year: 1978,
        genre: 'Drama',
      },
      {
        title: 'La vida de Bryan',
        director: 'Terry Jones',
        year: 1979,
        genre: 'Comedy',
      },
      {
        title: '50 prueba',
        director: 'prueba',
        year: 2004,
        genre: 'prueba',
      },
];

const movieDocuments = movie.map(movie => new Movie(movie));

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
  .connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
		// Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allMovies = await Movie.find();
		
		// Si existen personajes previamente, dropearemos la colección
    if (allMovies.length) {
      await Movie.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de los personajes, usaremos el array characterDocuments
		// para llenar nuestra base de datos con todas los personajes.
		await Movie.insertMany(movieDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => {
    mongoose.disconnect();
    console.log('OK!');
  });