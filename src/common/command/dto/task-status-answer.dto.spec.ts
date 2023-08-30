import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatusAnswerDTO } from './task-status-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_STATUS } from '../../../common/constant';

describe('TaskStatusAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskStatusAnswerDTO],
    }).compile();
  });

  describe('Task Status', () => {
    it('should validate a valid task status', async () => {
      const dto = new TaskStatusAnswerDTO(DEFAULT_TASK_STATUS);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskStatusAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task status', async () => {
      const dto = new TaskStatusAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskStatusAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task status in the type of TODO, IN_PROGRESS, DONE',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
