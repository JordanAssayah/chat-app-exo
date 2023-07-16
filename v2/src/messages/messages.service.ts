import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const createdMessage = new this.messageModel(createMessageDto);
    return await createdMessage.save();
  }

  async findAll() {
    return this.messageModel.find().exec();
  }

  async findOne(id: string) {
    return this.messageModel.findOne({ _id: id }).exec();
  }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  async remove(id: string) {
    const deletedMessage = await this.messageModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedMessage;
  }
}
