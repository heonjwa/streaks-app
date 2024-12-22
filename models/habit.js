import mongoose, { Schema } from "mongoose";

const habitSchema = new Schema(
  {
    name: { type: String, required: true },
    streak: { type: Number, default: 0 },
  },
  {
    timestamps: true
  }
)

const Habit = mongoose.models.Habit || mongoose.model("Habit", habitSchema);

export default Habit;