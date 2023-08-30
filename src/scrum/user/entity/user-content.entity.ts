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
  ValidateNested,
} from 'class-validator';
import { Expose, Type } from 'class-transformer';
import {
  PROJECT_ROLE_TYPES,
  PROJECT_ROLE_TYPE_ARRAY,
  SCRUM_ROLE_TYPES,
  SCRUM_ROLE_TYPE_ARRAY,
} from '../../../common/constant';
import {
  EMAIL_MSG,
  PASSWORD_MSG,
  PHONE_MSG,
  PROJECT_ROLES_MSG,
  SCRUM_ROLES_MSG,
} from '../../../common/command/dto';

const ERR_MSGS = {
  IS_EMAIL: 'Invalid email format',
  IS_STRING: 'Must be a string',
  MIN_LENGTH: 'Must be at least 8 characters long',
  IS_IN: 'Invalid value provided',
  PHONE_FORMAT: 'Invalid phone number format',
  PASSWORD_FORMAT:
    'Must include at least one uppercase letter, one lowercase letter, one digit, and one special character',
};

export class UserContentEntity {
  constructor(
    email: string,
    phone: string,
    lastName: string,
    firstName: string,
    projectRoles: PROJECT_ROLE_TYPES[],
    scrumRoles: SCRUM_ROLE_TYPES[],
    password: string,
  ) {
    this.email = email;
    this.phone = phone;
    this.lastName = lastName;
    this.firstName = firstName;
    this.projectRoles = projectRoles;
    this.scrumRoles = scrumRoles;
    this.password = password;
  }

  @ApiProperty({
    description: EMAIL_MSG.message,
    example: EMAIL_MSG.example,
  })
  @Expose({ name: 'email', toPlainOnly: true })
  @IsNotEmpty({ message: EMAIL_MSG.requiredMessage })
  @IsString({ message: EMAIL_MSG.typeMessage })
  @IsEmail({}, { message: EMAIL_MSG.errorMessage })
  email: string;

  @ApiProperty({
    description: PHONE_MSG.message,
    example: PHONE_MSG.example,
  })
  @Expose({ name: 'phone', toPlainOnly: true })
  @IsNotEmpty({ message: PHONE_MSG.requiredMessage })
  @IsString({ message: PHONE_MSG.typeMessage })
  @Matches(PHONE_MSG.regexp, {
    message: PHONE_MSG.errorMessage,
  })
  phone: string;

  @ApiProperty({
    description: 'User first name.',
    example: 'John',
  })
  @Expose({ name: 'firstName', toPlainOnly: true })
  @IsString({ message: ERR_MSGS.IS_STRING })
  firstName: string;

  @ApiProperty({
    description: 'User last name.',
    example: 'Doe',
  })
  @Expose({ name: 'lastName', toPlainOnly: true })
  @IsString({ message: ERR_MSGS.IS_STRING })
  lastName: string;

  @ApiProperty({
    description: PROJECT_ROLES_MSG.message,
    example: PROJECT_ROLES_MSG.example,
    type: [String],
    default: PROJECT_ROLES_MSG.default,
  })
  @Expose({ name: 'projectRoles', toPlainOnly: true })
  @IsNotEmpty({ message: PROJECT_ROLES_MSG.requiredMessage })
  @IsArray({ message: PROJECT_ROLES_MSG.typeMessage })
  @IsIn(PROJECT_ROLE_TYPE_ARRAY, {
    each: true,
    message: PROJECT_ROLES_MSG.invalidMessage,
  })
  projectRoles: PROJECT_ROLE_TYPES[];

  @ApiProperty({
    description: SCRUM_ROLES_MSG.message,
    example: SCRUM_ROLES_MSG.example,
    type: [String],
    default: SCRUM_ROLES_MSG.default,
  })
  @Expose({ name: 'scrumRoles', toPlainOnly: true })
  @IsNotEmpty({ message: SCRUM_ROLES_MSG.requiredMessage })
  @IsArray({ message: SCRUM_ROLES_MSG.typeMessage })
  @IsIn(SCRUM_ROLE_TYPE_ARRAY, {
    each: true,
    message: SCRUM_ROLES_MSG.invalidMessage,
  })
  scrumRoles: SCRUM_ROLE_TYPES[];

  @ApiProperty({
    description: PASSWORD_MSG.message,
    example: PASSWORD_MSG.example,
  })
  @Expose({ name: 'password', toPlainOnly: true })
  @IsNotEmpty({ message: PASSWORD_MSG.requiredMessage })
  @IsString({ message: PASSWORD_MSG.typeMessage })
  // @IsStrongPassword({}, { message: PASSWORD_MSG.errorMessage })
  @MinLength(8, { message: PASSWORD_MSG.MinLengthMessage })
  @MaxLength(20, { message: PASSWORD_MSG.MaxLengthMessage })
  @Matches(PASSWORD_MSG.regexp, {
    message: PASSWORD_MSG.errorMessage,
  })
  password: string;

  // @ApiProperty()
  // @Expose({ name: 'hashedPassword', toPlainOnly: true })
  // @IsString()
  // Hash: string;

  // @ApiProperty()
  // @Expose({ name: 'use2FA', toPlainOnly: true })
  // @IsString()
  // use2FA: boolean = false;
}
