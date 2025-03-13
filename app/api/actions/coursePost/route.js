import {  Courses, User } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";

export async function POST(req, res) {
  const inputs = await req.json();
  const { 
    course_name,
    course_code,
    credit_unit,
    facaulty,
    department,
   }=inputs;
     
    console.log("user input type is:",inputs)

  try {
    await connectToDB();
    // Search for the item
    const newCourse = new Courses({
      course_name,
      course_code,
      credit_unit,
      facaulty,
      department,
      });
      
    const courses = await newCourse.save();

    console.log("user input type is:",courses)

    return NextResponse.json({ success: true, data: courses }, { status: 201 });
    // if (!courses) {
    //   console.log("name of course", courses)
    //   return NextResponse.json({ error: 'course not created' }, { status: 404 })
    // }
    
    // NextResponse.redirect("/admin/Staff")
    // return NextResponse.json({ courses }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'internal server error', error }, { status: 500 })
  }
}


export async function GET(req, res) {
  try {
    await connectToDB();
    const courses = await Courses.find({});
    if (!courses) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }

    console.log("fetched courses")
    return NextResponse.json({ courses }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}


export async function PUT(req, res) {
  
  const inputs = await req.json();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
  const role = searchParams.get('role');

  try {
    await connectToDB();
    console.log("adding Lecturer to courses",inputs)

    const courses = await Courses.findByIdAndUpdate(id, {lecturer:inputs});
  

    if (!courses) {
      return NextResponse.json({ error: 'courses not found' }, { status: 404 })
    }
    revalidatePath("/admin/Student")
    console.log("lecturer added too courses")
    return NextResponse.json({ courses }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}



export async function DELETE(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  try {
    await connectToDB();
    await Courses.findByIdAndDelete(id);

    revalidatePath("/admin/Staff")
    return NextResponse.json({ success: true}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

