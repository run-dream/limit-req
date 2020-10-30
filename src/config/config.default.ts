import { EggAppConfig, EggAppInfo, PowerPartial } from 'midway';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';

  // add your config here
  config.middleware = [];
  // 令牌桶的大小
  config.bucketSize = 100;

  config.redis = {
    client: {
      port: 16379,
      host: 'remote',
      password: 'irhHq0diSQZs0S5h',
      db: 0,
    },
  };

  return config;
};
