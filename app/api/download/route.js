const fs = require("fs");
const path = require("path");
import { NextResponse } from 'next/server'
import { revalidatePath } from "next/cache";
import fsPromises from "fs/promises" 



export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    const filename = searchParams.get('filename');

    // const {filename} = req.params;
    const filePath = path.join(process.cwd(),
        "public/uploads/", filename); // Path to your file
    // Filename for the downloaded file
    // const fileName = "gfgNextJs.svg";

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        // console.log("content Type", fs.existsSync(filePath), filePath)
        return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    const stats = await fsPromises.stat(filePath);
    const fileContent = await fsPromises.readFile(filePath)
    // Define a mapping of file extensions to content types
    const contentTypeMap = {
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        doc: "application/msword" ,
        // Add more mappings as needed for other file types
    };

    // Get the file extension
    const fileExtension = filename.split(".").pop().toLowerCase();

    // Determine the content type based on the file extension
    const contentType =
        contentTypeMap[fileExtension] || "application/octet-stream";

       
    // Set headers to force download

    const headers ={
        "content-disposition": `attachment; filename=${
                      path.basename(filePath)
                      }`,
        "content-type": `${contentType}`,
    }
    // res.setHeader("Content-Disposition", 'attachment; filename=PMG_letter.docx');
    // res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");

    // Stream the file
    // const fileStream = fs.createReadStream(filePath);
    // fileStream.pipe(res);
//     return NextResponse.json({Message:"successful message"}, {headers})
const {
    open,
  } = require('node:fs/promises');
  
//   (async () => {
//     const file = await open(filePath);
  
//     for await (const chunk of file.readableWebStream({ type: "bytes" }))
//       console.log('read data from:',chunk);
  
//     await file.close();
//   })();
// return NextResponse.json({Message:"successful message"}, {headers})

     const fileHandle = await open(filePath)
      const stream = fileHandle.readableWebStream({ type: "bytes" })
     
      console.log("content Type", stream)
      return new Response(stream,{headers})

    // console.log(`content Type: ${contentType}`)
    // return new Response(
    //     fileContent, 
    //     {
    //       status: 200,
    //       headers: new Headers({
    //         // this optional header triggers a download in the browser
    //         "content-disposition": `attachment; filename=${
    //           path.basename(filePath)
    //           }`,
    //         "content-type": `${contentType}`,
    //         "content-length": stats.size + "",
    //     })
    //   })
  

    
}