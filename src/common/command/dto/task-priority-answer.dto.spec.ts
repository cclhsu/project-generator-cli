import { Test, TestingModule } from '@nestjs/testing';
import { TaskPriorityAnswerDTO } from './task-priority-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_PRIORITY } from '../../constant';

describe('TaskPriorityAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskPriorityAnswerDTO],
    }).compile();
  });

  describe('Task Priority', () => {
    it('should validate a valid task priority', async () => {
      const dto = new TaskPriorityAnswerDTO(DEFAULT_TASK_PRIORITY);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskPriorityAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task priority', async () => {
      const dto = new TaskPriorityAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskPriorityAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task priority in the type of P0, P1, P2, P3',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
