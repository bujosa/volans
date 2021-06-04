import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(imageBuffer: Buffer, fileName: string) {
    const storage = new Storage();
    return await storage.bucket('').upload(fileName, {});
  }
}
