import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const temp = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: temp,
  storage: multer.diskStorage({
    destination: temp,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
