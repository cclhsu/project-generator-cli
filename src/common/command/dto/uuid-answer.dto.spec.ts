import { Test, TestingModule } from '@nestjs/testing';
import { UuidAnswerDTO } from './uuid-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UuidAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UuidAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid UUID', async () => {
      const dto = new UuidAnswerDTO('00000000-0000-0000-0000-000000000000');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UuidAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid UUID', async () => {
      const dto = new UuidAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UuidAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
