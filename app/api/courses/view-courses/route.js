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
    
      const courses  = await Courses.find({lecturer:id})
      .lean();

    if (!courses ) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }
     // Count students enrolled in each course
     const courseData = await Promise.all(
        courses.map(async (course) => {
          const studentCount = await User.countDocuments({ courses: course._id }); // Count students
          return {
            id: course._id,
            course_name: course.course_name,
            course_code: course.course_code,
            students: studentCount, // Number of enrolled students
          };
        })
      );
      
      
    return NextResponse.json({ success: true, courseData}, { status: 201 });
    
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