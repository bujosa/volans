import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
        fileSize: 2000000,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.appService.uploadFile(file);
  }

  @Get('delete/:id')
  async deleteFile(@Param() params) {
    return await this.appService.deleteFile(params.id);
  }

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('photo', null, {
      limits: { fileSize: 2000000 },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<string[]> {
    return await this.appService.uploadFiles(files);
  }
}
