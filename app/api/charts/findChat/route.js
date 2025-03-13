import {ChatModel, } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";


export async function GET(req, {params}) {
    const searchParams = req.nextUrl.searchParams;
    const lectuerId = searchParams.get('lectuerId');
    const studentId = searchParams.get('studentId');
    const role = searchParams.get('role');
  
  
    console.log("list of chat with lectuerId,role, studentId",lectuerId,role, studentId)
  try {
    await connectToDB();
    if(role==="staff"){
        const chat = await ChatModel.find({
            members:{$all:[lectuerId,studentId ]}
        });
        console.log("staff chat found", chat)
    
        return NextResponse.json({ chat }, { status: 200 })
    }else{
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