import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DataDto {
  constructor(message: string) {
    this.message = message;
  }
  @ApiProperty()
  @IsString()
  message: string;
}

export class HelloJsonResponseDto {
  constructor(data: DataDto) {
    this.data = data;
  }
  @ApiProperty({ type: DataDto, required: false })
  data: DataDto;
}
