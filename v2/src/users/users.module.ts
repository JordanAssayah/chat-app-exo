import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { Channel, ChannelSchema } from '../channels/schemas/channel.schema';
import { UsersGateway } from './users.gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { ChannelsModule } from 'src/channels/channels.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Channel.name, schema: ChannelSchema },
    ]),
    MessagesModule,
    ChannelsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersGateway],
})
export class UsersModule {}
