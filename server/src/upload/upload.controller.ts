import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {parse} from 'csv-parse';
import { Express ,Response} from 'express'
import { createReadStream } from 'fs';
import { UploadService } from './upload.service';
@Controller('upload')
export class UploadController {
    
  constructor(private readonly upladerservice:UploadService){}
   @Get()
   hi():string{
    return "test";
   }
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Res() res:Response , @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 1000 }),
            new FileTypeValidator({ fileType: 'text/csv' }),
          ],
        }),
      ) file: Express.Multer.File) {

      console.log(file);
      const results = [];

      // Read the CSV file and validate format
      createReadStream(file.path,"ascii")
        .pipe(parse({ delimiter: ";", from_line: 2 }))
        .on('data', (rows) => {
          results.push({
            firstname: rows[0],
             lastname: rows[1],
             // username: rows[1] + rows[3],
          email: "N/A",
          password: "password",
          //address: rows[3] + ' ' + rows[4] + ' ' + rows[5] + ' ' + rows[6],
          role: rows[7],
        
          });
        })
        .on('end', () => {
          // Process the results here
          console.log(results);
           //return row insterted
         // this.upladerservice.createMany(results)
          res.json({error:0,users:results});

        });
    }
    
}
