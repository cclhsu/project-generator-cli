import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { Transform, Type } from 'class-transformer';
// import { UserMetadataDTO } from './user-metadata.dto';
// import { UserContentDTO } from './user-content.dto';

export class GetUserByIdRequestDTO {
  constructor(
    email: string,
    // metadata: UserMetadataDTO,
    // content: UserContentDTO,
  ) {
    this.email = email;
    // this.metadata = metadata;
    // this.content = content;
  }

  @ApiProperty()
  @Expose({ name: 'email', toPlainOnly: true })
  @IsString()
  email: string;

  // @ApiProperty()
  // @Expose({ name: 'metadata', toPlainOnly: true })
  // @IsObject()
  // metadata: UserMetadataDTO;

  // @ApiProperty()
  // @Expose({ name: 'content', toPlainOnly: true })
  // @IsObject()
  // content: UserContentDTO;
}
