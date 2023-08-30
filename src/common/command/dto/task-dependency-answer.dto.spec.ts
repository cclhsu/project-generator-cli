import { Test, TestingModule } from '@nestjs/testing';
import { TaskDependencyAnswerDTO } from './task-dependency-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_DEPENDENCY } from '../../constant';

describe('TaskDependencyAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskDependencyAnswerDTO],
    }).compile();
  });

  describe('Task Dependency', () => {
    it('should validate a valid task dependency', async () => {
      const dto = new TaskDependencyAnswerDTO(DEFAULT_TASK_DEPENDENCY);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskDependencyAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task dependency', async () => {
      const dto = new TaskDependencyAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskDependencyAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task dependency in the type of NONE, ALMOST_NONE, SOME, FEW, MORE_THAN_A_FEW, UNKNOWN',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
