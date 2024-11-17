import {ChatModel, } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";


export async function GET(req, {params}) {
    // const searchParams = req.nextUrl.searchParams;
    // const id = searchParams.get('id');
    const { id } = params;
    
    try {
      await connectToDB();
      const chats = await ChatModel.find({
          members:{$in:[id]}
      });
      console.log("find chat from /charts/[id]", chats)

      return NextResponse.json({ chats }, { status: 200 })
      
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
  }