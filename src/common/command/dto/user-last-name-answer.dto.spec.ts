import { Test, TestingModule } from '@nestjs/testing';
import { UserLastNameAnswerDTO } from './user-last-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UserLastNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserLastNameAnswerDTO],
    }).compile();
  });

  describe('user last name', () => {
    it('should validate a valid user last name', async () => {
      const dto = new UserLastNameAnswerDTO('Doe');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UserLastNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid user last name', async () => {
      const dto = new UserLastNameAnswerDTO('invalid-last-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UserLastNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid user last name format (e.g. Doe)',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
