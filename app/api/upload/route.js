// 

import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import {FileUrlModel } from "@/app/utils/models";

export const POST = async (req, res) => {
  const formData = await req.formData();

  const file = formData.get("file");
  const text = formData.get("text");
  const chatId = formData.get("chatId");
  const senderId = formData.get("senderId");
  console.log("form data", file)
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  console.log("file data",file)
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    const filemodel = await new FileUrlModel({
      chatId: chatId,
      senderId: senderId,
      fileUrl: filename,
      message: text,
      isDownloaded: false
    })

    const response = await filemodel.save();
    
    return NextResponse.json({ filename: filename, status: 200 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

//getfileUrl
export async function GET(req, res) {
  
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');
 
    // const {chatId} = req.params;
    console.log("list of fileurl from /api/upload", id)
  
  try {
    
    const fileUrls = await FileUrlModel.find({chatId:id});

    console.log("list of fileurl from /api/upload", fileUrls)

    return NextResponse.json({ fileUrls }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}