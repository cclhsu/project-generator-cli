import { Test, TestingModule } from '@nestjs/testing';
import { TaskEffortAnswerDTO } from './task-effort-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_EFFORT } from '../../constant';

describe('TaskEffortAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskEffortAnswerDTO],
    }).compile();
  });

  describe('Task Effort', () => {
    it('should validate a valid task effort', async () => {
      const dto = new TaskEffortAnswerDTO(DEFAULT_TASK_EFFORT);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskEffortAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task effort', async () => {
      const dto = new TaskEffortAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskEffortAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task effort in the type of XS, S, M, L, XL, I',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
