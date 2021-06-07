import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { uploadFileHelper } from './helper/upload-file';

@Injectable()
export class AppService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert('./settings.json'),
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return await uploadFileHelper(admin.storage(), file);
  }

  async deleteFile(key: string) {
    const bucket = admin.storage().bucket(process.env.BUCKET);
    try {
      bucket.file(key).delete();
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    const urls = [];
    files.map(async (file: Express.Multer.File) => {
      urls.push(await uploadFileHelper(admin.storage(), file));
    });
    return await urls;
  }
}
