import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const createdMessage = await this.messagesService.create(createMessageDto);
    return this.server
      .in(createMessageDto.channel_id)
      .emit('message', createdMessage);
  }

  @SubscribeMessage('findAllMessages')
  findAll() {
    return this.messagesService.findAll();
  }

  @SubscribeMessage('findOneMessage')
  findOne(@MessageBody() id: string) {
    return this.messagesService.findOne(id);
  }

  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() { id, channel_id }) {
    const deleteMessage = await this.messagesService.remove(id);
    this.server.in(channel_id).emit('message:deleted', id);
    return deleteMessage;
  }
}
