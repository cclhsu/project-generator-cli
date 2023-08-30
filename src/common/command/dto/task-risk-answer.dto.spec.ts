import { Test, TestingModule } from '@nestjs/testing';
import { TaskRiskAnswerDTO } from './task-risk-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_RISK } from '../../constant';

describe('TaskRiskAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskRiskAnswerDTO],
    }).compile();
  });

  describe('Task Risk', () => {
    it('should validate a valid task risk', async () => {
      const dto = new TaskRiskAnswerDTO(DEFAULT_TASK_RISK);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskRiskAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task risk', async () => {
      const dto = new TaskRiskAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskRiskAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task risk in the type of LOW, MEDIUM, HIGH',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
