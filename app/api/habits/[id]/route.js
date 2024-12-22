import connectMongoDB from "@/libs/mongodb";
import Habit from "@/models/habit";
import { NextResponse } from "next/server";

export async function PUT(context) {
  const { id } = await context.params; // Extract the habit ID from the URL

  try {
    await connectMongoDB(); // Ensure database connection

    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      { $inc: { streak: 1 } }, // Increment the streak count by 1
      { new: true } // Return the updated document
    );

    if (!updatedHabit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    return NextResponse.json({ habit: updatedHabit }, { status: 200 });
  } catch (error) {
    console.error("Error updating habit:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET({ params }) {
  const { id } = params;
  await connectMongoDB();
  const habit = await Habit.findOne({ _id: id });
  return NextResponse.json({ habit }, { status: 200 });
}

