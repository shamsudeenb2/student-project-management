import {ChatModel, } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";


export async function GET(req, {params}) {
    const searchParams = req.nextUrl.searchParams;
    const lectuerId = searchParams.get('lectuerId');
    const studentId = searchParams.get('studentId');
    const role = searchParams.get('role');
  
  
    
  try {
    await connectToDB();
    if(role==="staff"){
      console.log("list of chat with lectuerId and studentId",lectuerId, studentId)
        const chat = await ChatModel.find({
            members:{$all:[lectuerId,studentId ]}
        });
        console.log("staff chat found", chat)
    
        return NextResponse.json({ chat }, { status: 200 })
    }else{
      console.log("list of chat with lectuerId",lectuerId)
        const chat = await ChatModel.find({
            members:{$in:[lectuerId]}
        });
        console.log("student chat found", chat)
        return NextResponse.json({ chat }, { status: 200 })
    }

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}