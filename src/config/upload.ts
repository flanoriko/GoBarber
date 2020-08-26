import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const tmpfolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpfolder,
  uploadsfolder: path.resolve(tmpfolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpfolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
