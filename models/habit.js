import mongoose, { Schema } from "mongoose";

const habitSchema = new Schema(
  {
    name: { type: String, required: true },
    streak: { type: Number, default: 0 },
    completedToday: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
)

const Habit = mongoose.models.Habit || mongoose.model("Habit", habitSchema);

export default Habit;