import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/chat_app', {
      authSource: 'admin',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class MongoModule {}
