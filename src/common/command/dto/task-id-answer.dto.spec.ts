import { Test, TestingModule } from '@nestjs/testing';
import { TaskIdAnswerDTO } from './task-id-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('TaskIdAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskIdAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid task ID', async () => {
      const dto = new TaskIdAnswerDTO('ABC-1234');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskIdAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task ID', async () => {
      const dto = new TaskIdAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskIdAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid task ID format (e.g. ABC-1234)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
