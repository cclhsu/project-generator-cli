import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatedAtAnswerDTO } from '../dto/created-date-answer.dto';
import { InquirerService } from 'nest-commander';
// import { ConfigService } from '../../../config/config.service';
import { CommonDateDTO } from '../../../common/dto/common-date.dto';
import { CreatedByAnswerDTO } from '../dto/created-by-answer.dto';
import { StartedAtAnswerDTO } from '../dto/started-date-answer.dto';
import { UpdatedByAnswerDTO } from '../dto/updated-by-answer.dto';
import { StartedByAnswerDTO } from '../dto/started-by-answer.dto';
import { StartDateAnswerDTO } from '../dto/start-date-answer.dto';
import { EndDateAnswerDTO } from '../dto/end-date-answer.dto';
import { CompletedByAnswerDTO } from '../dto/completed-by-answer.dto';
import { CompletedAtAnswerDTO } from '../dto/completed-date-answer.dto';
import { CREATE_ACTION_TYPE } from '../../constant';

const logger = new Logger('getCommonDateDTO');

export async function getCommonDateDTO(
  // configService: ConfigService,
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<CommonDateDTO> {
  const newDate = new Date();
  const commonDateDTO: CommonDateDTO = {
    createdBy: options?.createdBy ?? '',
    createdAt: options?.createdAt ?? newDate,
    updatedBy: options?.updatedBy ?? '',
    updatedAt: options?.updatedAt ?? newDate,
    startedBy: options?.startedBy ?? '',
    startedAt: options?.StartedAt ?? null,
    startDate: options?.startDate ?? null,
    endDate: options?.endDate ?? null,
    completedBy: options?.completedBy ?? '',
    completedAt: options?.completeDate ?? null,
    // ...commonDateDTO,
    // ...options,
  };

  while (!commonDateDTO.createdBy && action === CREATE_ACTION_TYPE) {
    commonDateDTO.createdBy = (
      await inquirer.ask<CreatedByAnswerDTO>('created-by-questions', options)
    ).createdBy;
  }

  while (!commonDateDTO.createdAt && action === CREATE_ACTION_TYPE) {
    commonDateDTO.createdAt = newDate;
  }

  while (!commonDateDTO.updatedBy) {
    if (action === CREATE_ACTION_TYPE) {
      commonDateDTO.updatedBy = commonDateDTO.createdBy;
    } else {
      commonDateDTO.updatedBy = (
        await inquirer.ask<UpdatedByAnswerDTO>('updated-by-questions', options)
      ).updatedBy;
    }
  }

  while (!commonDateDTO.updatedAt) {
    if (action === CREATE_ACTION_TYPE) {
      commonDateDTO.updatedAt = commonDateDTO.createdAt;
    } else {
      commonDateDTO.updatedAt = newDate;
    }
  }

  if (!commonDateDTO.startedBy) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateDTO.startedBy = (
        await inquirer.ask<StartedByAnswerDTO>('started-by-questions', options)
      ).startedBy;
    }
  }

  if (!commonDateDTO.startedAt) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateDTO.startedAt = (
        await inquirer.ask<StartedAtAnswerDTO>(
          'started-date-questions',
          options,
        )
      ).startedAt;
    }
  }

  if (!commonDateDTO.startDate) {
    commonDateDTO.startDate = (
      await inquirer.ask<StartDateAnswerDTO>('start-date-questions', options)
    ).startDate;
  }

  if (!commonDateDTO.endDate) {
    commonDateDTO.endDate = (
      await inquirer.ask<EndDateAnswerDTO>('end-date-questions', options)
    ).endDate;
  }

  if (!commonDateDTO.completedBy) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateDTO.completedBy = (
        await inquirer.ask<CompletedByAnswerDTO>(
          'completed-by-questions',
          options,
        )
      ).completedBy;
    }
  }

  if (!commonDateDTO.completedAt) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateDTO.completedAt = (
        await inquirer.ask<CompletedAtAnswerDTO>(
          'completed-date-questions',
          options,
        )
      ).completedAt;
    }
  }

  logger.verbose(`commonDateDTO: ${JSON.stringify(commonDateDTO, null, 2)}`);
  return commonDateDTO;
}

export function updateCommonDates(
  original: CommonDateDTO,
  update: CommonDateDTO | undefined,
  updateOnly: boolean = false,
  forced: boolean = false,
): CommonDateDTO {
  const updated: CommonDateDTO = {
    ...original, // Clone the original object
  };

  // Update the dates from update if they exist
  if (update) {
    updated.updatedAt = update.updatedAt ?? updated.updatedAt;
    updated.updatedBy = update.updatedBy ?? updated.updatedBy;

    if (!updateOnly) {
      // Define properties to update conditionally based on the 'forced' flag
      updated.startedAt = update.startedAt ?? updated.startedAt;
      updated.startedBy = forced ? update.startedBy : updated.startedBy;
      updated.startDate = update.startDate ?? updated.startDate;
      updated.endDate = forced ? update.endDate : updated.endDate;
      updated.completedAt = update.completedAt ?? updated.completedAt;
      updated.completedBy = update.completedBy ?? updated.completedBy;
    }
  }

  return updated;
}
