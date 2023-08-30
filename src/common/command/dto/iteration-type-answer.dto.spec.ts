import { Test, TestingModule } from '@nestjs/testing';
import { IterationTypeAnswerDTO } from './iteration-type-answer.dto';
import { ValidationPipe } from '@nestjs/common';
import { DEFAULT_ITERATION_TYPE } from '../../../common/constant';

describe('IterationTypeAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [IterationTypeAnswerDTO],
    }).compile();
  });

  describe('Iteration Type', () => {
    it('should validate a valid iteration type', async () => {
      const dto = new IterationTypeAnswerDTO(DEFAULT_ITERATION_TYPE);
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: IterationTypeAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid iteration type', async () => {
      const dto = new IterationTypeAnswerDTO(undefined);
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: IterationTypeAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid iteration types in the type of SCRUM, KANBAN',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
