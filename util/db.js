import mongoose from 'mongoose';

// URL local de nuestra base de datos en mongoose y su nombre upgrade_class_3
//const DB_URL = 'mongodb://localhost:27017/movies';

const DB_URL = 'mongodb+srv://root:0810Otto0810@cluster0.3e1cg.mongodb.net/movies?retryWrites=true&w=majority';

// Función que conecta nuestro servidor a la base de datos de MongoDB mediante mongoose
const connection = mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export { connection };