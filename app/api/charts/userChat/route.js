import {  User } from "@/app/utils/models";
import bcrypt from "bcrypt";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// export async function POST(req, res) {
  
//   // const inputs = await req.json();
//   const { 
//     name,
//     username,
//     email,
//     phone,
//     password,
//     personalNo,
//     state,
//     dob,
//     program,
//     role
//    }= await req.json();;
     
//      console.log("user reach here")

//   try {
//     await connectToDB();
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     // Search for the item
//     const newUser = new User({
//         name,
//         username,
//         email,
//         phone,
//         password: hashedPassword,
//         personalNo,
//         state,
//         dob,
//         program,
//         role
//       });

//      const savedUser = await newUser.save();

//      return NextResponse.json({ success: true, data: savedUser }, { status: 201 });
    
//   } catch (error) {
//     console.error('error handle', error)
//     return NextResponse.json({ error: 'internal server error', error }, { status: 500 })
//   }
 
// }


export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    try {
      await connectToDB();
      const users = await User.find({role: id});
  
      if (!users) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }
        

        return NextResponse.json({ success: true, users}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}

// export async function PUT(req, res) {
  
//   const inputs = await req.json();
//   const searchParams = req.nextUrl.searchParams;
//   const id = searchParams.get('id');
//   try {
//     await connectToDB();
//     const updateFields={
//       supervisor: inputs
//     }
    

//     const users = await User.findByIdAndUpdate(id, {supervisor:inputs});
  

//     if (!users) {
//       return NextResponse.json({ error: 'user not found' }, { status: 404 })
//     }
//     revalidatePath("/admin/Student")
//     return NextResponse.json({ users }, { status: 200 })
//   } catch (error) {
//     return NextResponse.json({ error: 'server error' }, { status: 500 })
//   }
// }

// export async function DELETE(req, res) {
//   const searchParams = req.nextUrl.searchParams;
//   const id = searchParams.get('id');

//   try {
//     await connectToDB();
//     await User.findByIdAndDelete(id);

//     revalidatePath("/admin/Student")
//     return NextResponse.json({ success: true}, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'server error' }, { status: 500 })
//   }
    
// }