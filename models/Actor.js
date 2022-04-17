import mongoose from 'mongoose';
//prueba
const Schema = mongoose.Schema;

const actorSchema = new Schema(
  {
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    age:{type: Number, required:true},
  },
  {
    timestamps: true,
  }
);

const Actor = mongoose.model('Actor',actorSchema );

export { Actor }