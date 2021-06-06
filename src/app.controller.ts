import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

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
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.uploadFile(file);
  }

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('photo', {
  //     storage: new MulterGoogleStorage({
  //       projectId: '',
  //       keyFilename: path.join(__dirname, '../myfile.json'),
  //       bucket: '',
  //       file: (req, file, cb) => {
  //         const fileNameSplit = file.originalname.split('.');
  //         const fileExt = fileNameSplit.pop();
  //         cb(null, `${Date.now()}.${fileExt}`);
  //       },
  //     }),
  //   }),
  // )
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  // @Post('upload')
  // @UseInterceptors(
  //   FileInterceptor('photo', {
  //     storage: new MulterGoogleStorage({
  //       projectId: '',
  //       bucket: '',
  //       filename: () => {},
  //     }),
  //     limits: {
  //       fileSize: 1000000,
  //       files: 2,
  //     },
  //     dest: './uploads',
  //   }),
  // )
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  // }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('photo', 3, {
      limits: { fileSize: 2000000 },
    }),
  )
  uploadFiles(@UploadedFile() files: Array<Express.Multer.File>) {
    this.appService.uploadFiles(files);
  }
}
