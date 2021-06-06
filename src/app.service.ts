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
    const storage = new Storage();
    return await storage.bucket('').upload(file.filename, {});
  }
}
