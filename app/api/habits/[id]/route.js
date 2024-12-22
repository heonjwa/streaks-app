import connectMongoDB from "@/libs/mongodb";
import Habit from "@/models/habit";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newName: name, newStreak: streak } = await request.json();
  await connectMongoDB();
  await Habit.findByIdAndUpdate(id, { name, streak });
  return NextResponse.json({ message: "Habit updated"}, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const habit = await Habit.findOne({ _id: id });
  return NextResponse.json({ habit }, { status: 200 });
}

