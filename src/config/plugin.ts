import { EggPlugin } from 'midway';
export default {
  static: true, // default is true
  redis: {
    enable: true,
    package: 'egg-redis',
  },
} as EggPlugin;
