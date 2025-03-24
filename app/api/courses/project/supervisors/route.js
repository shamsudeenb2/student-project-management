import {  Courses, User } from "@/app/utils/models";
import bcrypt from "bcrypt";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    try {
      await connectToDB();
      const users = await Courses.findOne({project_supervisors: {$ne:[]}}).populate('project_supervisors')

      console.log("users lecturer",users)
      if (!users) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }
        
        return NextResponse.json({ success: true, users}, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}