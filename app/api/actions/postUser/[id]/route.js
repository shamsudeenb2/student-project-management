import {  User } from "@/app/utils/models";
import bcrypt from "bcrypt";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile } from "fs/promises";


export async function GET(req,{params}) {
    const searchParams = req.nextUrl.searchParams;
    const role = searchParams.get('role');
    const { id } = params;
    
    await connectToDB();
    console.log("fetch user with id and role", id, role)
    try {
      const user = await User.findById(id).populate("supervisor")
  
      if (!user) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }

      console.log("fetch user with id and role", user)
      return NextResponse.json({ user }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
  }