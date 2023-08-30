import { ApiProperty } from '@nestjs/swagger';
import { Answers } from 'inquirer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsStrongPassword,
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

export const PASSWORD_MSG: Answers = {
  regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
  message:
    'Password Must include at least one uppercase letter, one lowercase letter, one digit, and one special character in the format "P@ssw0rd123".',
  example: 'e.g. P@ssw0rd123',
  typeMessage: 'Password must be a string',
  requiredMessage: 'Please enter an password',
  invalidMessage: 'Please enter a valid password',
  errorMessage: 'Please enter a valid password format (e.g. P@ssw0rd123)',
  MinLengthMessage: 'Password must be at least 8 characters long.',
  MaxLengthMessage: 'Password must be at most 20 characters long.',
};

export class PasswordAnswerDTO {
  constructor(password: string) {
    this.password = password;
  }

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
}
