import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/_http/auth/auth.module';
import { CampaingModule } from './infrastructure/_http/modules/campaing/campaing.module';
import { CategoryModule } from './infrastructure/_http/modules/category/category.module';
import { ImagesModule } from './infrastructure/_http/modules/images/images.module';
import { ModulesModule } from './infrastructure/_http/modules/modules/modules.module';
import { UserModule } from './infrastructure/_http/modules/user/user.module';
import { VideosModule } from './infrastructure/_http/modules/videos/videos.module';
import { ConfigurationModule } from './infrastructure/config/configuration.module';
import { MysqlDatabaseModule } from './infrastructure/database/mysql.module';

@Module({
  imports: [AuthModule, VideosModule, ModulesModule, ImagesModule, CampaingModule, CategoryModule, UserModule, MysqlDatabaseModule, ConfigurationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
