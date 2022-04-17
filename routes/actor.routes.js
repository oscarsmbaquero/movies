import express from 'express';

import { Actor } from '../models/Actor.js';

const router = express.Router();
//listado
router.get('/', async (req, res) => {
    try {
      const actors = await Actor.find();
      return res.status(200).json(actors)
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  router.get('/:name', async (req, res) => {
    const {name} = req.params;
  
    try {
      const actorsName = await Actor.find({ name: name });
      if(actorsName.length >0){
      return res.status(200).json(actorsName);
      }else{
        return res.status(404).json('No existe un actor con ese nombre');
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  

  router.post('/', async (req, res, next) => {
    try {
      // Crearemos una instancia de character con los datos enviados
      const newActor = new Actor({
        name: req.body.name,
        nationality: req.body.nationality,
        age: req.body.age
      });
  
      // Guardamos el personaje en la DB
      const createdActor = await newActor.save();
      return res.status(201).json(createdActor);
    } catch (error) {
          // Lanzamos la función next con el error para que lo gestione Express
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
        await Actor.findByIdAndDelete(id);
        return res.status(200).json('Actor deleted!');
    } catch (error) {
        return next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params; //Recuperamos el id de la url
        const actorModify = new Actor(req.body); //instanciamos un nuevo Character con la información del body
        actorModify._id = id; //añadimos la propiedad _id al personaje creado
        const actorUpdated = await Actor.findByIdAndUpdate(id , actorModify);
        return res.status(200).json(actorUpdated);//Este personaje que devolvemos es el anterior a su modificación
    } catch (error) {
        return next(error)
    }
  });
  


  export { router as actorsRoutes }