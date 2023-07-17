import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChannelDto } from './dto/create-channel.dto';
// import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './schemas/channel.schema';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel.name)
    private channelModel: Model<Channel>,
  ) {}

  async create(createChannelDto: CreateChannelDto) {
    const createdChannel = new this.channelModel(createChannelDto);
    return await createdChannel.save();
  }

  async findAll(): Promise<Channel[]> {
    return this.channelModel.find().exec();
  }

  async findOne(id: string): Promise<Channel> {
    return this.channelModel.findOne({ _id: id }).exec();
  }

  async findOneByName(name: string): Promise<Channel> {
    return this.channelModel.findOne({ name }).exec();
  }

  // async update(id: number, updateChannelDto: UpdateChannelDto) {
  //   return `This action updates a #${id} channel`;
  // }

  async remove(id: string) {
    const deletedChannel = await this.channelModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedChannel;
  }
}
