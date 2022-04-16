import mongoose from 'mongoose';
//prueba
const Schema = mongoose.Schema;

const cinemaSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },

    movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
  },
  {
    timestamps: true,
  }
);

const Cinema = mongoose.model('Cinema',cinemaSchema );

export { Cinema }