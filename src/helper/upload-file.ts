/* eslint-disable prettier/prettier */
import { storage } from 'firebase-admin';
import { v4 as uuid } from 'uuid';

export const uploadFileHelper = async (
  storage: storage.Storage,
  file: Express.Multer.File,
) => {
  const bucket = storage.bucket(process.env.BUCKET);
  const fileName = `${Date.now()}-${uuid()}.${file.originalname
    .split('.')
    .pop()}`;
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();
  const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  await blobStream.end(file.buffer);
  return publicUrl;
};
