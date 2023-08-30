import { Test, TestingModule } from '@nestjs/testing';
import { IterationIdAnswerDTO } from './iteration-id-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('IterationIdAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [IterationIdAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid iteration ID', async () => {
      const dto = new IterationIdAnswerDTO('ABC:2020/01/01-2020/12/31');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: IterationIdAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid iteration ID', async () => {
      const dto = new IterationIdAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: IterationIdAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid iteration ID format (e.g. ABC:2020/01/01-2020/12/31)',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
