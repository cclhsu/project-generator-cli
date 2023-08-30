import { Test, TestingModule } from '@nestjs/testing';
import { TaskTypeAnswerDTO } from './task-type-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_TYPE } from '../../../common/constant';

describe('TaskTypeAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskTypeAnswerDTO],
    }).compile();
  });

  describe('Task Type', () => {
    it('should validate a valid task type', async () => {
      const dto = new TaskTypeAnswerDTO(DEFAULT_TASK_TYPE);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskTypeAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task type', async () => {
      const dto = new TaskTypeAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskTypeAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task types in the type of EPIC, STORY, TASK, BUG, FEATURE, IMPROVEMENT, SUB_TASK',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
