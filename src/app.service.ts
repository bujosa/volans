import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { uploadFileFunction } from './helper/upload-file';

@Injectable()
export class AppService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert('./settings.json'),
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return await uploadFileFunction(admin.storage(), file);
  }

  async deleteFile(key: string) {
    const bucket = admin.storage().bucket(process.env.BUCKET);
    const file = bucket.file(key).delete();
    return file;
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const urls = [];
    console.log(files);
    files.map(async (file: Express.Multer.File) => {
      urls.push(await uploadFileFunction(admin.storage(), file));
    });
    return await urls;
  }
}
