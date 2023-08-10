import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsObject,
  IsString,
  MinLength,
  isObject,
} from 'class-validator';
import { Expose } from 'class-transformer';

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
  codeReviewed: boolean; // Indicates whether the code has been reviewed by a team member
  unitTestsPassed: boolean; // Indicates whether all unit tests are passing
  integrationTestsPassed: boolean; // Indicates whether all integration tests are passing
  automatedTestsWritten: boolean; // Indicates whether automated tests have been written for the feature
  documentationUpdated: boolean; // Indicates whether the documentation has been updated
  acceptanceCriteriaMet: boolean; // Indicates whether all acceptance criteria are met
  designReviewed: boolean; // Indicates whether the design has been reviewed
  noCriticalBugs: boolean; // Indicates whether there are no critical bugs in the feature
  performanceTested: boolean; // Indicates whether the feature has been performance tested
  securityReviewed: boolean; // Indicates whether the security aspects have been reviewed
  reviewedByProductOwner: boolean; // Indicates whether the feature has been reviewed and approved by the Product Owner
}
