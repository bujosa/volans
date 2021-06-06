import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert('./settings.json'),
      storageBucket: 'curbo-buyers-mobile-app-stage.appspot.com',
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File) {
    console.log(file);
    const storage = admin.storage();
    return await storage.bucket(process.env.BUCKET).upload('pictures').then();
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    console.log(files[0]);
    const storage = new Storage();
    return await storage
      .bucket(process.env.BUCKET)
      .upload(files[0].filename, {});
  }
}
