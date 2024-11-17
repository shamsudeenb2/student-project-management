import {MessageModel, } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";


//getMessages
export async function GET(req, {params}) {
  
    const { id } = params;
    console.log("id from /api/messages/[id]", id)
  
  try {
    await connectToDB();
    const messages = await MessageModel.find({chatId:id});
    console.log("list of messages from /api/messages/[id]", messages)

    return NextResponse.json({ messages }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}