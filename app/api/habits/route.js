import connectMongoDB from "@/libs/mongodb";
import Habit from "@/models/habit";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { name, streak } = await request.json();
  await connectMongoDB();
  await Habit.create({name, streak});
  return NextResponse.json({ message: "Habit Created"}, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const habits = await Habit.find();
  return NextResponse.json({ habits });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Habit.findByIdAndDelete(id);
  return NextResponse.json({ message: "Habit deleted"}, { status: 200 });
}