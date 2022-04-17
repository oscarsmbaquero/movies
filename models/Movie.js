import mongoose from 'mongoose';
//prueba
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number },
    genre: { type: String, required: true },

    actor: [{ type: mongoose.Types.ObjectId, ref: 'Actor' }],
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model('Movie', movieSchema);

export { Movie }