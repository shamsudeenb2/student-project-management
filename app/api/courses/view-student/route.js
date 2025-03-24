import {  User, Courses } from "@/app/utils/models";
import bcrypt from "bcrypt";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  const role = searchParams.get('role');
  
  try {
    await connectToDB();
    
    const users = await User.find({supervisor:id}) // return project students
      

    if (!users ) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }
      
      
    return NextResponse.json({ success: true, users}, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

export async function PUT(req, res) {
  
  const inputs = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    await connectToDB();
    const updateFields={
      supervisor: inputs
    }
    
    console.log("update course", id, inputs)

    await User.updateOne({ _id:id },{$push: { courses: inputs } });

    revalidatePath("/students")
    return NextResponse.json({ success: true}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}