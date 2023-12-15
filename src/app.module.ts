import { Module } from '@nestjs/common';
import { ConfigurationModule } from './infrastructure/config/configuration.module';
import { MysqlDatabaseModule } from './infrastructure/database/mysql.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, MysqlDatabaseModule, ConfigurationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
