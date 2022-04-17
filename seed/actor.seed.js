// Archivo character.seed.js

import mongoose from 'mongoose';

// Imporatmos el modelo Pet en este nuevo archivo.
import { Actor } from '../models/Actor.js';

const actor = [
    {
        name: 'Keanu Reeves',
        nationality: 'Canada',
        age: 1964,
      },
      {
        name: 'Marlon Brando',
        nationality: 'EEUU',
        age: 1924,
      },
      {
        name: 'Daniel Day-Lewis',
        nationality: 'Great Britain',
        age: 1957,
      },
      {
        name: 'Karra Elejalde',
        nationality: 'Spanish',
        age: 1960,
      },
      {
        name: 'Robert Creel Davis',
        nationality: 'EEUU',
        age: 1949,
      },
      {
        name: 'Graham Chapman ',
        nationality: 'Great Britain',
        age: 1941,
      },
     
];

const actorDocuments = actor.map(actor => new Actor(actor));

// En este caso, nos conectaremos de nuevo a nuestra base de datos
// pero nos desconectaremos tras insertar los documentos
mongoose
  .connect('mongodb://localhost:27017/movies', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
		// Utilizando Character.find() obtendremos un array con todos los personajes de la db
    const allActors = await Actor.find();
		
		// Si existen personajes previamente, dropearemos la colección
    if (allActors.length) {
      await Actor.collection.drop(); //La función drop borra la colección
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
		// Una vez vaciada la db de los personajes, usaremos el array characterDocuments
		// para llenar nuestra base de datos con todas los personajes.
		await Actor.insertMany(actorDocuments);
	})
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => {
    mongoose.disconnect();
    console.log('OK!');
  });