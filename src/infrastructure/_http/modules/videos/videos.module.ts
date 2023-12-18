import { VideosController } from './controllers/videos.controller';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [VideosController],
  providers: [],
})
export class VideosModule {}
