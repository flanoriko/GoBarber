import cacheConfig from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';

import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // recuperando todas as chaves com este prefixo
    const keys = await this.client.keys(`${prefix}:*`);
    // para executar varias ao mesmo tempo com a mesma chave
    const pipeline = this.client.pipeline();
    // chamar o delete pra cada chave encontrada
    keys.forEach(key => {
      pipeline.del(key);
    });
    // aqui sim vai executar o que está em cima
    await pipeline.exec();
  }
}
