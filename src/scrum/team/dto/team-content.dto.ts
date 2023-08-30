import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { IdUuidDTO } from '../../../common/dto/id-uuid.dto';
import { IsArrayOfIdUuidDTO } from '../../../utils/decorator/IsArrayOfIdUuidDTO.decorator';

export class TeamContentDTO {
  constructor(
    members: IdUuidDTO[],
    productOwner: IdUuidDTO,
    scrumMaster: IdUuidDTO,
  ) {
    this.members = members;
    this.productOwner = productOwner;
    this.scrumMaster = scrumMaster;
  }

  @ApiProperty({
    description: 'IdUuidDTO of team members in the Team',
    example: [{ ID: 'abc.xyz', UUID: '00000000-0000-0000-0000-000000000000' }],
    type: [IdUuidDTO],
  })
  @Expose({ name: 'members', toPlainOnly: true })
  @IsArray()
  @Validate(IsArrayOfIdUuidDTO)
  @IsObject({ each: true })
  members: IdUuidDTO[];

  @ApiProperty({
    description:
      'ID and UUID of the user who is the Product Owner of the Scrum Team (UUID)',
    example: '{"ID":"john.doe","UUID":"00000000-0000-0000-0000-000000000001"}',
  })
  @Expose({ name: 'productOwner', toPlainOnly: true })
  @IsObject()
  productOwner: IdUuidDTO;

  @ApiProperty({
    description:
      'ID and UUID of the user who is the Scrum Master of the Scrum Team (UUID)',
    example: '{"ID":"jane.doe","UUID":"00000000-0000-0000-0000-000000000002"}',
  })
  @Expose({ name: 'scrumMaster', toPlainOnly: true })
  @IsObject()
  scrumMaster: IdUuidDTO;

  // @ApiProperty({
  //   description: 'IDs of team members in the Team Metadata (IDs)',
  //   example: ['john.doe'],
  //   type: [String],
  // })
  // @Expose({ name: 'members', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // members: IdUuidDTO[];

  // @ApiProperty({
  //   description: 'IDs of team productOwner in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'productOwner', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // productOwner: IdUuidDTO;

  // @ApiProperty({
  //   description: 'IDs of team scrumMaster in the Team Metadata (ID)',
  //   example: 'john.doe',
  //   type: String,
  // })
  // @Expose({ name: 'scrumMaster', toPlainOnly: true })
  // @IsArray()
  // @IsString({ each: true, message: 'Invalid string format' })
  // scrummMster: string;
}
