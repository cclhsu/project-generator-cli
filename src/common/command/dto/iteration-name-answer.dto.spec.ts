import { Test, TestingModule } from '@nestjs/testing';
import { IterationNameAnswerDTO } from './iteration-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('IterationNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [IterationNameAnswerDTO],
    }).compile();
  });

  describe('iteration name', () => {
    it('should validate a valid iteration name', async () => {
      const dto = new IterationNameAnswerDTO(
        'XYZ:2020/01/01-2022/12/31 Iteration',
      );
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: IterationNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid iteration name', async () => {
      const dto = new IterationNameAnswerDTO('invalid-iteration-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: IterationNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid iteration name format (e.g. PPP:YYYY/MM/DD-YYYY/MM/DD Iteration)',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
