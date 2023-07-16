import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChannelsGateway {
  constructor(private readonly channelsService: ChannelsService) {}

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
