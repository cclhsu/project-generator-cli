import { Test, TestingModule } from '@nestjs/testing';
import { UserFirstNameAnswerDTO } from './user-first-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UserFirstNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserFirstNameAnswerDTO],
    }).compile();
  });

  describe('user first name', () => {
    it('should validate a valid user first name', async () => {
      const dto = new UserFirstNameAnswerDTO('John');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UserFirstNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid user first name', async () => {
      const dto = new UserFirstNameAnswerDTO('invalid-first-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UserFirstNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid user first name format (e.g. John)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
