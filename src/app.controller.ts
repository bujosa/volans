import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

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
  uploadFile(@UploadedFile() file) {
    console.log(file);
    return file.filename;
  }
}
