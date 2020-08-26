import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementation/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider', // qq norme que vc queira
  DiskStorageProvider,
);
