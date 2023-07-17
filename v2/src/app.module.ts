import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { MongoModule } from './mongo/mongo.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [UsersModule, ChannelsModule, MongoModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
