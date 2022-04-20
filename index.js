import express from 'express';
import './util/db.js';

import passport from 'passport';
import session from 'express-session';
import './authentication/passport.js'; // Requerimos nuestro archivo de configuración

// import { Movie} from './models/Movie.js';
 import { userRoutes } from './routes/user.routes.js';
 import { moviesRoutes } from './routes/movies.routes.js';
 import { cinemaRoutes } from './routes/cinema.routes.js';
 import { actorsRoutes } from './routes/actor.routes.js';
 

// SERVER
const PORT = 3000;
const server = express();

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Arrancaa!');
  });

//listado
 

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(
  session({
    secret: 'upgradehub_node', // ¡Este secreto tendremos que cambiarlo en producción!
    resave: false, // Solo guardará la sesión si hay cambios en ella.
    saveUninitialized: false, // Lo usaremos como false debido a que gestionamos nuestra sesión con Passport
    cookie: {
      maxAge: 3600000 // Milisegundos de duración de nuestra cookie, en este caso será una hora.
    },
  })
);
server.use(passport.initialize());
server.use(passport.session());

server.use('/user', userRoutes);
server.use('/movies', moviesRoutes);
server.use('/cinema', cinemaRoutes);
server.use('/actor', actorsRoutes);


// Routes
 
// server.use('/locations', locationRoutes);

// Error Control 404
server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});
server.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || 'Unexpected error');
});


server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});