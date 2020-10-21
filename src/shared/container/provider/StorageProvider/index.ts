import upLoadConfig from '@config/upload';
import { container } from 'tsyringe';

import DiskStorageProvider from './implementation/DiskStorageProvider';
import S3StorageProvider from './implementation/S3StorageProvider';
import IStorageProvider from './models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider', // qq norme que vc queira
  providers[upLoadConfig.driver],
);
