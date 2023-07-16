import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Channel', required: true })
  channel_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user_id: string;

  @Prop({ required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
