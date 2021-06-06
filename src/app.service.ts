import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import * as admin from 'firebase-admin';

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

  async uploadFile(file: Express.Multer.File) {
    const bucket = admin.storage().bucket(process.env.BUCKET);
    const fileName = `${Date.now()}.${file.originalname.split('.').pop()}`;
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    await blobStream.end(file.buffer);
    return publicUrl;
  }

  async deleteFile(key: string) {
    const bucket = admin.storage().bucket(process.env.BUCKET);
    const file = bucket.file(key).delete();
    return file;
  }

  async uploadFiles(files: Array<Express.Multer.File>) {
    console.log(files[0]);
    const storage = new Storage();
    return await storage
      .bucket(process.env.BUCKET)
      .upload(files[0].filename, {});
  }
}
