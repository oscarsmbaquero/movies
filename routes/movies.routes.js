import express from 'express';

import { Movie } from '../models/Movie.js';

const router = express.Router();
 router.get('/', async (req, res) => {
    try {
      const movies = await Movie.find().populate('actor');;
      return res.status(200).json(movies)
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  router.get('/:title', async (req, res) => {
    const {title} = req.params;
  
    try {
      const moviesTitle = await Movie.find({ title: title });
      if(moviesTitle.length >0){
      return res.status(200).json(moviesTitle);
      }else{
        return res.status(404).json('No existe una peli con ese título');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  router.get('/genre/:genre', async (req, res) => {
    const {genre} = req.params;
  
    try {
      const moviesGenre = await Movie.find({ genre: genre });
      if(moviesGenre.length >0){
      return res.status(200).json(moviesGenre);
      }else{
        return res.status(404).json('No existe una peli con ese genero');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });
//por año
  router.get('/year/:year', async (req, res) => {
    const {year} = req.params;
  
    try {
      const moviesYear = await Movie.find({ year: { $gt:year} });
      if(moviesYear){
      return res.status(200).json(moviesYear);
      }else{
        return res.status(404).json('No existe una peli de ese año');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      // Crearemos una instancia de character con los datos enviados
      const newMovie = new Movie({
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        genre: req.body.genre
      });
  
      // Guardamos el personaje en la DB
      const createdMovie = await newMovie.save();
      return res.status(201).json(createdMovie);
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
        await Movie.findByIdAndDelete(id);
        return res.status(200).json('Movie deleted!');
    } catch (error) {
        return next(error);
    }
});

// router.put('/:id', async (req, res, next) => {
//   try {
//       const { id } = req.params; //Recuperamos el id de la url
//       const movieModify = new Movie(req.body); //instanciamos un nuevo Character con la información del body
//       movieModify._id = id; //añadimos la propiedad _id al personaje creado
//       const movieUpdated = await Movie.findByIdAndUpdate(id , movieModify);
//       return res.status(200).json(movieUpdated);//Este personaje que devolvemos es el anterior a su modificación
//   } catch (error) {
//       return next(error)
//   }
// });

router.put('/add-movie', async (req, res, next) => {
  try {
      
      const { actorId } = req.body;
      const { movieId } = req.body;
      const updatedMovie = await Movie.findByIdAndUpdate(
          movieId,
          { $push: { actor: actorId } },
          { new: true }
      );
      return res.status(200).json(updatedMovie);
  } catch (error) {
      return next(error);
  }
});

  export { router as moviesRoutes }