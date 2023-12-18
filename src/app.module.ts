import { Module } from '@nestjs/common';
import { ConfigurationModule } from './infrastructure/config/configuration.module';
import { MysqlDatabaseModule } from './infrastructure/database/mysql.module';
import { CampaingModule } from './modules/campaing/campaing.module';
import { CategoryModule } from './modules/category/category.module';
import { ImagesModule } from './modules/images/images.module';
import { ModulesModule } from './modules/modules/modules.module';
import { UserModule } from './modules/user/user.module';
import { VideosModule } from './modules/videos/videos.module';

@Module({
  imports: [VideosModule, ModulesModule, ImagesModule, CampaingModule, CategoryModule, UserModule, MysqlDatabaseModule, ConfigurationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
