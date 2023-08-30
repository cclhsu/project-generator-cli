import { Test, TestingModule } from '@nestjs/testing';
import { UserIdAnswerDTO } from './user-id-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UserIdAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserIdAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid user ID', async () => {
      const dto = new UserIdAnswerDTO('john.doe');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UserIdAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid user ID', async () => {
      const dto = new UserIdAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UserIdAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid user ID format (e.g. john.doe)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
