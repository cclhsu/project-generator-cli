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

export class DefinitionOfDoneDTO {
  constructor(
    codeReviewed: boolean,
    unitTestsPassed: boolean,
    integrationTestsPassed: boolean,
    automatedTestsWritten: boolean,
    documentationUpdated: boolean,
    acceptanceCriteriaMet: boolean,
    designReviewed: boolean,
    noCriticalBugs: boolean,
    performanceTested: boolean,
    securityReviewed: boolean,
    reviewedByProductOwner: boolean,
  ) {
    this.codeReviewed = codeReviewed;
    this.unitTestsPassed = unitTestsPassed;
    this.integrationTestsPassed = integrationTestsPassed;
    this.automatedTestsWritten = automatedTestsWritten;
    this.documentationUpdated = documentationUpdated;
    this.acceptanceCriteriaMet = acceptanceCriteriaMet;
    this.designReviewed = designReviewed;
    this.noCriticalBugs = noCriticalBugs;
    this.performanceTested = performanceTested;
    this.securityReviewed = securityReviewed;
    this.reviewedByProductOwner = reviewedByProductOwner;
  }

  @ApiProperty({
    description:
      'Indicates whether the code has been reviewed by a team member.',
  })
  @Expose({ name: 'codeReviewed', toPlainOnly: true })
  @IsBoolean()
  codeReviewed: boolean;

  @ApiProperty({
    description: 'Indicates whether all unit tests are passing.',
  })
  @Expose({ name: 'unitTestsPassed', toPlainOnly: true })
  @IsBoolean()
  unitTestsPassed: boolean;

  @ApiProperty({
    description: 'Indicates whether all integration tests are passing.',
  })
  @Expose({ name: 'integrationTestsPassed', toPlainOnly: true })
  @IsBoolean()
  integrationTestsPassed: boolean;

  @ApiProperty({
    description:
      'Indicates whether automated tests have been written for the feature.',
  })
  @Expose({ name: 'automatedTestsWritten', toPlainOnly: true })
  @IsBoolean()
  automatedTestsWritten: boolean;

  @ApiProperty({
    description: 'Indicates whether the documentation has been updated.',
  })
  @Expose({ name: 'documentationUpdated', toPlainOnly: true })
  @IsBoolean()
  documentationUpdated: boolean;

  @ApiProperty({
    description: 'Indicates whether all acceptance criteria are met.',
  })
  @Expose({ name: 'acceptanceCriteriaMet', toPlainOnly: true })
  @IsBoolean()
  acceptanceCriteriaMet: boolean;

  @ApiProperty({
    description: 'Indicates whether the design has been reviewed.',
  })
  @Expose({ name: 'designReviewed', toPlainOnly: true })
  @IsBoolean()
  designReviewed: boolean;

  @ApiProperty({
    description: 'Indicates whether there are no critical bugs in the feature.',
  })
  @Expose({ name: 'noCriticalBugs', toPlainOnly: true })
  @IsBoolean()
  noCriticalBugs: boolean;

  @ApiProperty({
    description: 'Indicates whether the feature has been performance tested.',
  })
  @Expose({ name: 'performanceTested', toPlainOnly: true })
  @IsBoolean()
  performanceTested: boolean;

  @ApiProperty({
    description: 'Indicates whether the security aspects have been reviewed.',
  })
  @Expose({ name: 'securityReviewed', toPlainOnly: true })
  @IsBoolean()
  securityReviewed: boolean;

  @ApiProperty({
    description:
      'Indicates whether the feature has been reviewed and approved by the Product Owner.',
  })
  @Expose({ name: 'reviewedByProductOwner', toPlainOnly: true })
  @IsBoolean()
  reviewedByProductOwner: boolean;
}
