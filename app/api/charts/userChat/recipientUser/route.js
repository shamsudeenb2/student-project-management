import {  User } from "@/app/utils/models";
import { connectToDB } from "@/app/utils/databaseCon";
import { NextResponse } from 'next/server'

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    try {
      await connectToDB();
      const user = await User.findById(id);
  
      if (!user) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }

      console.log("find user from /charts/userChat/recipientUser")

        return NextResponse.json({ success: true, user}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}