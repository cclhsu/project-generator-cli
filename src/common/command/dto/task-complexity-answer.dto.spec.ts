import { Test, TestingModule } from '@nestjs/testing';
import { TaskComplexityAnswerDTO } from './task-complexity-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_COMPLEXITY } from '../../constant';

describe('TaskComplexityAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskComplexityAnswerDTO],
    }).compile();
  });

  describe('Task Complexity', () => {
    it('should validate a valid task complexity', async () => {
      const dto = new TaskComplexityAnswerDTO(DEFAULT_TASK_COMPLEXITY);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskComplexityAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task complexity', async () => {
      const dto = new TaskComplexityAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskComplexityAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task complexity in the type of XS, S, M, L, XL, I',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
