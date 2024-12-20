import connectMongoDB from "@/libs/mongodb";
import Habit from "@/models/habit";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, streak } = await request.json();
  await connectMongoDB();
  await Habit.create({title, streak});
  return NextResponse.json({ message: "Habit Created"}, { status: 201 });
}