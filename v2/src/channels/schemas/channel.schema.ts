import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Channel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  created_by: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ type: [String], default: [] })
  members: string[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
