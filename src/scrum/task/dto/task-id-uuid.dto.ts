// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsUUID, Matches } from 'class-validator';

export class TaskIdUuidDTO {
  constructor(ID: string, UUID: string) {
    this.ID = ID;
    this.UUID = UUID;
  }

  @ApiProperty({
    description: 'ID is Unique identifier for ' + TaskIdUuidDTO.name,
    example: 'PPP-0001',
  })
  @Expose({ name: 'ID', toPlainOnly: true })
  @IsString({ message: 'ID must be a string' })
  @Matches(/^[A-Z]{3}-\d{4}$/, {
    message: 'Ticket number should follow the format "PPP-XXXX".',
  })
  ID: string;

  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      TaskIdUuidDTO.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: 'Please enter an UUID' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message:
      'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  UUID: string;
}
