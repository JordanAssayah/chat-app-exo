export class CreateMessageDto {
  readonly channel_id: string;
  readonly user_id: number;
  readonly content: string;
}
