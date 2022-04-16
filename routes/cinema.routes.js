import express from 'express';

import { Cinema } from '../models/Cinema.js';

const router = express.Router();
 router.get('/', async (req, res) => {
    try {
      const cinemas = await Cinema.find().populate('movies');
      return res.status(200).json(cinemas)
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  router.get('/:name', async (req, res) => {
    const {name} = req.params;
  
    try {
      const cinemasTitle = await Cinema.find({ name: name });
      if(cinemasTitle.length >0){
      return res.status(200).json(cinemasTitle);
      }else{
        return res.status(404).json('No existe un cine con ese nombre');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  router.get('/location/:location', async (req, res) => {
    const {location} = req.params;
  
    try {
      const cinemaLocation = await Cinema.find({ location: location });
      if(cinemaLocation.length >0){
      return res.status(200).json(cinemaLocation);
      }else{
        return res.status(404).json('No existe un cine en esa ciudad');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      // Crearemos una instancia de character con los datos enviados
      const newCinema = new Cinema({
        name: req.body.name,
        location: req.body.location,
        movies:[]
      });
  
      // Guardamos el personaje en la DB
      const createdCinema = await newCinema.save();
      return res.status(201).json(createdCinema);
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
        await Cinema.findByIdAndDelete(id);
        return res.status(200).json('cine deleted!');
    } catch (error) {
        return next(error);
    }
});

// router.put('/:id', async (req, res, next) => {
//   try {
//       const { id } = req.params; //Recuperamos el id de la url
//       const cinemaModify = new Cinema(req.body); //instanciamos un nuevo Character con la información del body
//       cinemaModify._id = id; //añadimos la propiedad _id al personaje creado
//       const movieUpdated = await Cinema.findByIdAndUpdate(id , cinemaModify);
//       return res.status(200).json(cinemaModify);//Este personaje que devolvemos es el anterior a su modificación
//   } catch (error) {
//       return next(error)
//   }
// });

router.put('/add-cinema', async (req, res, next) => {
    try {
        
        const { movieId } = req.body;
        const { cinemaId } = req.body;
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $push: { movies: movieId } },
            { new: true }
        );
        return res.status(200).json(updatedCinema);
    } catch (error) {
        return next(error);
    }
});

  export { router as cinemaRoutes }