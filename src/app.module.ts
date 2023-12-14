import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { MysqlDatabaseModule } from './database/mysql.module';

@Module({
  imports: [
         MysqlDatabaseModule,ConfigurationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
