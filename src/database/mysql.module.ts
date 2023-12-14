import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
const settings = require('../../ormconfig.js');

@Module({
  imports: [ TypeOrmModule.forRoot(settings)],
  controllers: [],
  providers: [],
})
export class MysqlDatabaseModule {}
