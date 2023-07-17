import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { AuthenticareUserDto } from './dto/authenticate-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { MessagesService } from 'src/messages/messages.service';
import { ChannelsService } from 'src/channels/channels.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class UsersGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
    private readonly channelsService: ChannelsService,
  ) {}

  async handleConnection(socket: any) {
    const users = await this.usersService.findAll();
    this.server.to(socket.id).emit('user:get-all', users);
  }

  @SubscribeMessage('user:authenticate')
  async handleAuthenticateUserMessage(
    @MessageBody() credentials: AuthenticareUserDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = await this.usersService.authenticate(credentials);

    if (user === null || user.password !== credentials.password) {
      this.server
        .to(socket.id)
        .emit(
          'user:authentication-error',
          'Bad credentials or user does not exist!',
        );
    }

    const messages = await this.messagesService.findAll();
    const chn = await this.channelsService.findOneByName('general');

    socket.join(chn.id);
    this.server.to(socket.id).emit('message:get-all', messages);
    this.server.to(socket.id).emit('user:authenticated', user);
  }

  @SubscribeMessage('user:create')
  async handleCreateUserMessage(
    @MessageBody() user: CreateUserDto,
    @ConnectedSocket() socket: Socket,
  ): Promise<object> {
    try {
      const createdUser = await this.usersService.create(user);

      socket.emit('user:created', createdUser);

      return createdUser;
    } catch (error) {
      console.log(error);
    }
  }
}
