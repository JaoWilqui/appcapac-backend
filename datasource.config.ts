import * as dotenv from 'dotenv';
import * as mysqlDriver from 'mysql2';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  driver: mysqlDriver,
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  migrations: ['/../../typeorm-migrations/*.{ts,js}'],
  entities: ['../**/*.entity.{ts,js}'],
});
