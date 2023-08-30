import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';

export class DataDTO {
  constructor(message: string) {
    this.message = message;
  }
  @ApiProperty()
  @IsString()
  message: string;
}

export class HelloJsonResponseDTO {
  constructor(data: DataDTO) {
    this.data = data;
  }
  @ApiProperty({ type: DataDTO, required: false })
  data: DataDTO;
}
