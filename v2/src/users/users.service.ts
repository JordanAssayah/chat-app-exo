import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WsException } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { AuthenticareUserDto } from './dto/authenticate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { Channel } from 'src/channels/schemas/channel.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Channel.name)
    private channelModel: Model<Channel>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const searchedUser = await this.userModel
      .findOne({ username: createUserDto.username })
      .exec();

    if (searchedUser !== null) {
      throw new WsException({
        type: 'user:creation-error',
        message: 'Username already in use',
      });
    }

    const general = await this.channelModel.findOne({ name: 'general' }).exec();

    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async authenticate(credentials: AuthenticareUserDto): Promise<User> {
    const user = await this.userModel
      .findOne({ username: credentials.username })
      .exec();

    // if (user === null || user.password !== credentials.password) {
    //   return null;
    //   io.to(socket.id).emit(
    //     'user:authentication-error',
    //     'Bad credentials or user does not exist!',
    //   );
    // }

    // const messages = await queries.getAllMessages();

    // socket.join('general');
    // io.to(socket.id).emit('message:get-all', messages);
    // io.to(socket.id).emit('user:authenticated', user);
    return user;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
