import {  Courses, User } from "@/app/utils/models";
import bcrypt from "bcrypt";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req, res) {
  const formData = await req.formData();
  
  // const inputs = await req.json();
  const img = formData.get("img");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const password = formData.get("password");
  const personalNo = formData.get("personalNo");
  const username = formData.get("username");
  const role = formData.get("role");
  const name = formData.get("name");
  const state = formData.get("state");
  const program = formData.get("program");
  // const { 
  //   name,
  //   username,
  //   email,
  //   phone,
  //   password,
  //   personalNo,
  //   state,
  //   dob,
  //   program,
  //   role
  //  }= await req.json();;
  
     console.log("user reach here",name,username,state,personalNo,password)
     const buffer = Buffer.from(await img.arrayBuffer());
     const filename =  img.name.replaceAll(" ", "_");
     console.log(filename)

  try {

    await writeFile(
      path.join(process.cwd(), "public/profile/" + filename),
      buffer
    );
    await connectToDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Search for the item
    const newUser = new User({
        name,
        username,
        email,
        phone,
        password: hashedPassword,
        personalNo,
        state,
        program,
        role,
        img:filename
      });

     const savedUser = await newUser.save();

     return NextResponse.json({ success: true, data: savedUser }, { status: 201 });
    
  } catch (error) {
    console.error('error handle', error)
    return NextResponse.json({ error: 'internal server error', error }, { status: 500 })
  }
    // NextResponse.redirect("/admin/Student")
}


export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const role = searchParams.get('role');

  await connectToDB();
  
  try {
    if(role === "student"){
      console.log("server fetch user role", role)
      const users = await User.find({role:role});

      if (!users) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }
  
      return NextResponse.json({ users }, { status: 200 })
    }else{
      const users = await User.find({role:role});

      if (!users) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }
  
      return NextResponse.json({ users }, { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

//Assign a supervisor to student
export async function PUT(req, res) {
  
  const inputs = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  try {
    await connectToDB();
    const updateFields={
      supervisor: inputs
    }
    
    console.log("when do inputs and id", inputs,id)

    const user = await User.findByIdAndUpdate(id, {supervisor:inputs}).populate("supervisor");
  

    if (!user) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }
    revalidatePath("/admin/Student")
    console.log("user staff id", user)
    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

export async function DELETE(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    await connectToDB();
    await User.findByIdAndDelete(id);

    revalidatePath("/admin/Student")
    return NextResponse.json({ success: true}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
    
}