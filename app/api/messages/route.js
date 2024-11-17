import {MessageModel, } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";




//create message
export async function POST(req, res) {
    
    const inputs = await req.json();
    const { 
      chatId,
      senderId,
      text
     }=inputs;
       
      
  
    try {
      await connectToDB();
    //   const message = await MessageModel.findOne({
    //       members:{$all:[lectuerId,studentId ]}
    //   })
  
    //   if(message) return NextResponse.json({ message}, { status: 200 });
  
      const newMessage = new MessageModel({
        chatId,senderId,text
        });
  
      const response = await newMessage.save();
      console.log("user detail reach here",response)
      return NextResponse.json({ response}, { status: 200 })
      
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  }


//getMessages
export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  
    // const {chatId} = req.params;
    console.log("list of messages from /api/messages id", id)
  
  try {
    await connectToDB();
    const messages = await MessageModel.find({chatId:id});

    console.log("list of messages from /api/messages", messages)

    return NextResponse.json({ messages }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}