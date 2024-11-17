import {ChatModel, } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";


export async function GET(req, {params}) {
  
    const {lectuerId,studentId} = req.params;
  
    console.log("list of chat with id", )
  try {
    await connectToDB();
    const chat = await ChatModel.find({
        members:{$all:[lectuerId,studentId ]}
    });
    console.log("find chat from /charts/find/[id]", chat)

    return NextResponse.json({ chat }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}