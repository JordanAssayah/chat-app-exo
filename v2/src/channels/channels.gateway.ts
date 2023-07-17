import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChannelsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly channelsService: ChannelsService) {}

  async handleConnection(socket: any) {
    const chn = await this.channelsService.findOneByName('general');
    socket.join(chn._id);
    this.server.to(socket.id).emit('channel:general', chn);
  }

  @SubscribeMessage('createChannel')
  create(@MessageBody() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @SubscribeMessage('findAllChannels')
  findAll() {
    return this.channelsService.findAll();
  }

  @SubscribeMessage('findOneChannel')
  findOne(@MessageBody() id: string) {
    return this.channelsService.findOne(id);
  }

  @SubscribeMessage('removeChannel')
  remove(@MessageBody() id: string) {
    return this.channelsService.remove(id);
  }
}
