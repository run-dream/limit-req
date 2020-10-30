import { readFileSync } from 'fs';
import { Redis } from 'ioredis';
import { join } from 'path';

export class ReqLimitter {
  redis: Redis;
  bucketSize: number;
  speed: number;
  key: string;

  constructor(
    redis: Redis,
    key: string,
    bucketSize = 100,
    speed = 2
  ) {
    this.redis = redis;
    this.key = key;
    this.bucketSize = bucketSize;
    this.speed = speed;
    this.redis.defineCommand('acquire', {
      numberOfKeys: 3,
      lua: this.luaScript,
    });
  }

  get luaScript() {
    return readFileSync(join(__dirname, './acquire.lua')).toString();
  }

  async acquire(): Promise<boolean> {
    const result: number = await (this.redis as any).acquire(
      'key',
      'bucketSize',
      'speed',
      this.key,
      this.bucketSize,
      this.speed
    );
    return result > -1;
  }
}
