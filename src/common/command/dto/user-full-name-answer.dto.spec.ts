import { Test, TestingModule } from '@nestjs/testing';
import { UserFullNameAnswerDTO } from './user-full-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UserFullNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserFullNameAnswerDTO],
    }).compile();
  });

  describe('user full name', () => {
    it('should validate a valid user full name', async () => {
      const dto = new UserFullNameAnswerDTO('John Doe');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UserFullNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid user full name', async () => {
      const dto = new UserFullNameAnswerDTO('invalid-full-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UserFullNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid user full name format (e.g. John Doe)',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
