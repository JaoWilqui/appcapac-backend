import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/infrastructure/_http/guards/auth.guard';
import { AuthModule } from './infrastructure/_http/auth/auth.module';
import { PermsGuard } from './infrastructure/_http/guards/perms.guard';
import { CampaingModule } from './infrastructure/_http/modules/campaing/campaing.module';
import { FilesModule } from './infrastructure/_http/modules/files/files.module';
import { ImagesModule } from './infrastructure/_http/modules/images/images.module';
import { ModulesModule } from './infrastructure/_http/modules/modules/modules.module';
import { OperatorsModule } from './infrastructure/_http/modules/operators/operators.module';
import { ProductModule } from './infrastructure/_http/modules/product/product.module';
import { UserModule } from './infrastructure/_http/modules/user/user.module';
import { VideosModule } from './infrastructure/_http/modules/videos/videos.module';
import { ConfigurationModule } from './infrastructure/config/configuration.module';
import { MysqlDatabaseModule } from './infrastructure/database/mysql.module';

@Module({
  imports: [
    OperatorsModule,
    AuthModule,
    FilesModule,
    VideosModule,
    ModulesModule,
    ImagesModule,
    CampaingModule,
    ProductModule,
    UserModule,
    MysqlDatabaseModule,
    ConfigurationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermsGuard,
    },
  ],
})
export class AppModule {}
