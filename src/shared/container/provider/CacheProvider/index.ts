import { container } from 'tsyringe';

import RedisCacheProvider from './implementation/RedisCacheProvider';
import ICacheProvider from './models/ICacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>(
  'CacheProvider', // qq norme que vc queira
  providers.redis,
);
