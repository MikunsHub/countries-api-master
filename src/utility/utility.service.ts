import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class UtilityService {
  constructor(
    private configService: ConfigService,
  ) {}

  private getRedisClient(): Promise<Redis> {
    const host = String(this.configService.get<string>('REDIS_HOST'));
    const port = Number(this.configService.get<number>('REDIS_PORT'));
    const password = String(this.configService.get<string>('REDIS_PASSWORD'));

    return new Promise((resolve) => {
      const redis = new Redis({
        host,
        port,
        password,
        tls: {
          servername: host,
        },
      });
      resolve(redis);
    });
  }

  /**
   *
   * @param key - string
   * @param value - any type
   * @param ttl - time to live in seconds
   */
  async setCache(key: string, value: any, ttl: number): Promise<void> {
    const client = await this.getRedisClient();
    const valueString = JSON.stringify(value);
    await client.set(key, valueString, 'EX', ttl);
    await client.quit();
  }

  async setCacheWithoutExpiration(key: string, value: any): Promise<void> {
    const client = await this.getRedisClient();
    const valueString = JSON.stringify(value);
    await client.set(key, valueString);
    await client.quit();
  }

  /**
   *
   * @param key - string
   * @returns - any type
   */
  async getCache(key: string): Promise<any> {
    const client = await this.getRedisClient();
    const value = await client.get(key);
    await client.quit();
    return value;
  }

  /**
   *
   * @param key - string
   */
  async deleteCache(key: string): Promise<void> {
    const client = await this.getRedisClient();
    await client.del(key);
    await client.quit();
  }
}
