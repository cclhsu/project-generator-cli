import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
// import { TaskMetadataDTO } from './task-metadata.dto';
// import { TaskContentDTO } from './task-content.dto';

export class GetTaskByIdRequestDTO {
  constructor(
    UUID: string,
    // metadata: TaskMetadataDTO,
    // content: TaskContentDTO,
  ) {
    this.UUID = UUID;
    // this.metadata = metadata;
    // this.content = content;
  }

  @ApiProperty()
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsString()
  UUID: string;

  // @ApiProperty()
  // @Expose({ name: 'metadata', toPlainOnly: true })
  // @IsObject()
  // metadata: TaskMetadataDTO;

  // @ApiProperty()
  // @Expose({ name: 'content', toPlainOnly: true })
  // @IsObject()
  // content: TaskContentDTO;
}
