import { Test, TestingModule } from '@nestjs/testing';
import { TaskNameAnswerDTO } from './task-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('TaskNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskNameAnswerDTO],
    }).compile();
  });

  describe('task name', () => {
    it('should validate a valid task name', async () => {
      const dto = new TaskNameAnswerDTO('XYZ Task');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task name', async () => {
      const dto = new TaskNameAnswerDTO('invalid-task-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid task name format (e.g. XYZ Task)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
