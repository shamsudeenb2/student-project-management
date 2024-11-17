import {ChatModel, } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";


//create chart
export async function POST(req, res) {
  await connectToDB();
  const inputs = await req.json();
  const  {lecturerId,studentId}=inputs;
     
  console.log("lecturerId and studentId", lecturerId, studentId)

  try {
    await connectToDB();
    const chat = await ChatModel.findOne({
        members:{$all:[lecturerId,studentId]}
    })

    if(chat) return NextResponse.json({ chat}, { status: 200 });

    const newChat = new ChatModel({
        members:[lecturerId,studentId]
      });

    const response = await newChat.save();
      return NextResponse.json({ response}, { status: 200 })
    
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

//findUserChats
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  console.log("lets see id", id)
  
  try {
    await connectToDB();
    const chats = await ChatModel.find({
        members:{$in:[id]}
    });
    console.log("find chat /charts", chats)

    return NextResponse.json({ chats:chats }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

export async function PUT(req, res) {
  await connectToDB();
  const inputs = await req.json();
  const id = req.query
  try {
    const updateFields={
      supervisor: inputs.id
    }
    const users = await User.findByIdAndUpdate(id, updateFields);
    console.log("user", users)

    if (!users) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }
    revalidatePath("/admin/Student")
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}