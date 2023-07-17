import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { Channel, ChannelSchema } from './schemas/channel.schema';
import { ChannelsGateway } from './channels.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService, ChannelsGateway],
  exports: [ChannelsService],
})
export class ChannelsModule {}
