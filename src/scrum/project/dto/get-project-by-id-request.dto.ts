import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
// import { ProjectMetadataDTO } from './project-metadata.dto';
// import { ProjectContentDTO } from './project-content.dto';

export class GetProjectByIdRequestDTO {
  constructor(
    UUID: string,
    // metadata: ProjectMetadataDTO,
    // content: ProjectContentDTO,
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
  // metadata: ProjectMetadataDTO;

  // @ApiProperty()
  // @Expose({ name: 'content', toPlainOnly: true })
  // @IsObject()
  // content: ProjectContentDTO;
}
