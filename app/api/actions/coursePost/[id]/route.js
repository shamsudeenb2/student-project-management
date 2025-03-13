import { Courses, User } from "@/app/utils/models";
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
    
    try {
      if(role==="project"){
        console.log("fetch courses with id and role", id, role)
        const course = await Courses.findById(id).populate("project_supervisors")
        console.log("fetch courses with id and role", course)
        if (!course) {
          return NextResponse.json({ error: 'project not found' }, { status: 404 })
        }
  
        console.log("fetch project with id and role", course)
        
        return NextResponse.json({ course }, { status: 200 })
      }else{
        const course = await Courses.findById(id).populate("lecturer")
  
        if (!course) {
          return NextResponse.json({ error: 'course not found' }, { status: 404 })
        }
  
        console.log("fetch course with id and role", course)
        
        return NextResponse.json({ course }, { status: 200 })
      }

    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
  }


  export async function PUT(req,{params}) {
  
    const inputs = await req.json();
    const searchParams = req.nextUrl.searchParams;
    const { id } = params;
    const role = searchParams.get('role');
  
    try {
      await connectToDB();
      console.log("adding Lecturer to project",inputs,id)

      const courses = await Courses.updateOne({ _id:id },{$push: { project_supervisors: inputs } });
      console.log("adding Lecturer to project", courses)
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
  
  
  
  export async function DELETE(req, {params}) {
    const searchParams = req.nextUrl.searchParams;
    const item = searchParams.get('item');
    const { id } = params;
  
    try {
      await connectToDB();
      // await Courses.findByIdAndDelete(id);
      const courses = await Courses.updateOne({ _id:id },{$pull: { project_supervisors: item } });
  
     
      return NextResponse.json({ success: true, message:"Deleted successefully"}, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'server error' }, { status: 500 })
    }
  }
  
  