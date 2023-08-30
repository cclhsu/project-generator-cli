import { Test, TestingModule } from '@nestjs/testing';
import { PasswordAnswerDTO } from './password-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('PasswordAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PasswordAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid password', async () => {
      const dto = new PasswordAnswerDTO('P@ssw0rd123');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: PasswordAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid password', async () => {
      const dto = new PasswordAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: PasswordAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid password format (e.g. P@ssw0rd123)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
