import { Test, TestingModule } from '@nestjs/testing';
import { TaskUncertaintyAnswerDTO } from './task-uncertainty-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_TASK_UNCERTAINTY } from '../../../common/constant';

describe('TaskUncertaintyAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TaskUncertaintyAnswerDTO],
    }).compile();
  });

  describe('Task Uncertainty', () => {
    it('should validate a valid task uncertainty', async () => {
      const dto = new TaskUncertaintyAnswerDTO(DEFAULT_TASK_UNCERTAINTY);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TaskUncertaintyAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid task uncertainty', async () => {
      const dto = new TaskUncertaintyAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TaskUncertaintyAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid task uncertainty in the type of NONE, SOME, LOW, MODERATE, HIGH, EXTREME',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
