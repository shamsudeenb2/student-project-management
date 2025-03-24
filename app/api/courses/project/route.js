import {  Courses, User } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    try {
          console.log("server fetch user id", id)

          const student = await User.findById(id);
    
          if (!student) {
            return NextResponse.json({ error: 'student not found' }, { status: 404 })
          }

          
          const course = await Courses.findOne({course_name:'project'});
          const courseId = course._id.toString()

          console.log("project found", courseId, student.courses.length)
          if(course){
            const isProject = student.courses.includes(course._id)
            if(isProject){
              return NextResponse.json({ isProject }, { status: 200 })
            }
            return NextResponse.json({ error: 'student did not register for project' }, { status: 404 })
          }

          console.log("project not found", course)
          
          // let i=0
          // while(i < student.courses.length()-1){
          //   const course = await Courses.findById(student.courses[i]);
          //   if(course.course_name ==="project"){
          //       isProject=true
          //       break
          //       return
          //   }
          //   i++
          // }

        //   for(let i =0; i < student.courses.length()-1; i++){
        //     const course = await Courses.findById(student.courses[i]);
        //     if(course.course_name ==="project"){
        //         isProject=true
        //         break
        //         return
        //     }
        //   }
        //   const isProject = student.courses.map(async(id)=> {
        //      const course = await Courses.findById(id);

        //   });
      
        return NextResponse.json({ error: 'project was not added' }, { status: 404 })
          // return NextResponse.json({ isProject }, { status: 200 })

        } catch (error) {
          console.error(error)
            return NextResponse.json({ error: 'server error' }, { status: 500 })
        }
}