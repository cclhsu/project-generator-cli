import { CreatedDateAnswerDTO } from '../dto/created-date-answer.dto';
import { InquirerService } from 'nest-commander';
// import { ConfigService } from 'src/config/config.service';
import { CommonDateCommandOptionsDTO } from 'src/scrum/common/dto/common-date-options.dto';
import { CreatedByAnswerDTO } from '../dto/created-by-answer.dto';
import { StartedDateAnswerDTO } from '../dto/started-date-answer.dto';
import { UpdatedByAnswerDTO } from '../dto/updated-by-answer.dto';
import { StartedByAnswerDTO } from '../dto/started-by-answer.dto';
import { StartDateAnswerDTO } from '../dto/start-date-answer.dto';
import { EndDateAnswerDTO } from '../dto/end-date-answer.dto';
import { CompletedByAnswerDTO } from '../dto/completed-by-answer.dto';
import { CompletedDateAnswerDTO } from '../dto/completed-date-answer.dto';
import { CREATE_ACTION_TYPE } from '../../constant';

export async function getCommonDateCommandOptionsDTO(
  // configService: ConfigService,
  inquirer: InquirerService,
  options: Record<string, any> | undefined,
  action: string = CREATE_ACTION_TYPE,
): Promise<CommonDateCommandOptionsDTO> {
  const newDate = new Date();
  const commonDateCommandOptionsDTO: CommonDateCommandOptionsDTO = {
    createdBy: '',
    createdDate: newDate,
    updatedBy: '',
    updatedDate: newDate,
    // ...commonDateCommandOptionsDTO,
    ...options,
  };

  while (!commonDateCommandOptionsDTO.createdBy) {
    commonDateCommandOptionsDTO.createdBy = (
      await inquirer.ask<CreatedByAnswerDTO>('created-by-questions', options)
    ).createdBy;
  }

  while (!commonDateCommandOptionsDTO.createdDate) {
    commonDateCommandOptionsDTO.createdDate = newDate;
  }

  while (!commonDateCommandOptionsDTO.updatedBy) {
    if (action === CREATE_ACTION_TYPE) {
      commonDateCommandOptionsDTO.updatedBy =
        commonDateCommandOptionsDTO.createdBy;
    } else {
      commonDateCommandOptionsDTO.updatedBy = (
        await inquirer.ask<UpdatedByAnswerDTO>('updated-by-questions', options)
      ).updatedBy;
    }
  }

  while (!commonDateCommandOptionsDTO.updatedDate) {
    if (action === CREATE_ACTION_TYPE) {
      commonDateCommandOptionsDTO.updatedDate =
        commonDateCommandOptionsDTO.createdDate;
    } else {
      commonDateCommandOptionsDTO.updatedDate = newDate;
    }
  }

  if (!commonDateCommandOptionsDTO.startedBy) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateCommandOptionsDTO.startedBy = (
        await inquirer.ask<StartedByAnswerDTO>('started-by-questions', options)
      ).startedBy;
    }
  }

  if (!commonDateCommandOptionsDTO.startedDate) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateCommandOptionsDTO.startedDate = (
        await inquirer.ask<StartedDateAnswerDTO>(
          'started-date-questions',
          options,
        )
      ).startedDate;
    }
  }

  if (!commonDateCommandOptionsDTO.startDate) {
    commonDateCommandOptionsDTO.startDate = (
      await inquirer.ask<StartDateAnswerDTO>('start-date-questions', options)
    ).startDate;
  }

  if (!commonDateCommandOptionsDTO.endDate) {
    commonDateCommandOptionsDTO.endDate = (
      await inquirer.ask<EndDateAnswerDTO>('end-date-questions', options)
    ).endDate;
  }

  if (!commonDateCommandOptionsDTO.completedBy) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateCommandOptionsDTO.completedBy = (
        await inquirer.ask<CompletedByAnswerDTO>(
          'completed-by-questions',
          options,
        )
      ).completedBy;
    }
  }

  if (!commonDateCommandOptionsDTO.completedDate) {
    if (action !== CREATE_ACTION_TYPE) {
      commonDateCommandOptionsDTO.completedDate = (
        await inquirer.ask<CompletedDateAnswerDTO>(
          'completed-date-questions',
          options,
        )
      ).completedDate;
    }
  }

  const { createdBy } = commonDateCommandOptionsDTO;
  const { createdDate } = commonDateCommandOptionsDTO;
  const { updatedBy } = commonDateCommandOptionsDTO;
  const { updatedDate } = commonDateCommandOptionsDTO;
  const { startedBy } = commonDateCommandOptionsDTO;
  const { startedDate } = commonDateCommandOptionsDTO;
  const { startDate } = commonDateCommandOptionsDTO;
  const { endDate } = commonDateCommandOptionsDTO;
  const { completedBy } = commonDateCommandOptionsDTO;
  const { completedDate } = commonDateCommandOptionsDTO;

  displayCommonDateOptionsResults(
    createdBy ?? 'N/A',
    createdDate ?? 'N/A',
    updatedBy ?? 'N/A',
    updatedDate ?? 'N/A',
    startedBy ?? 'N/A',
    startedDate ?? null,
    startDate ?? 'N/A',
    endDate ?? 'N/A',
    completedBy ?? 'N/A',
    completedDate ?? null,
  );

  return commonDateCommandOptionsDTO;
}

function displayCommonDateOptionsResults(
  createdBy: string,
  createdDate: Date,
  updatedBy: string,
  updatedDate: Date,
  startedBy: string,
  startedDate: Date | null,
  startDate: Date,
  endDate: Date,
  completedBy: string,
  completedDate: Date | null,
): void {
  console.log(`createdBy: ${createdBy}`);
  console.log(`createdDate: ${createdDate}`);
  console.log(`updatedBy: ${updatedBy}`);
  console.log(`updatedDate: ${updatedDate}`);
  console.log(`startedBy: ${startedBy}`);
  console.log(`startedDate: ${startedDate}`);
  console.log(`startDate: ${startDate}`);
  console.log(`endDate: ${endDate}`);
  console.log(`completedBy: ${completedBy}`);
  console.log(`completedDate: ${completedDate}`);
}
