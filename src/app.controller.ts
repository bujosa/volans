import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
// import MulterGoogleStorage from 'multer-google-storage';
// import googleStorage from '@google-cloud/storage';
// import Multer from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      limits: {
        fileSize: 1000000,
        files: 2,
      },
      dest: './uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('photo', 3, {
      dest: './uploads',
      limits: { fileSize: 1000000 },
    }),
  )
  uploadFiles(@UploadedFile() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
