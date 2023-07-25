import { DB_CONFIG } from './private.config';
import { ConnectionOptions } from 'typeorm';

const dbConfig: ConnectionOptions = {
  ...DB_CONFIG,
  type: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [
    'src/database/migrations/*.ts',
  ],
  synchronize: true,
};

export default dbConfig;