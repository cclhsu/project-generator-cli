import { Test, TestingModule } from '@nestjs/testing';
import { UrlAnswerDTO } from './url-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UrlAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UrlAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid url', async () => {
      const dto = new UrlAnswerDTO('https://xyz.com');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UrlAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid url', async () => {
      const dto = new UrlAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UrlAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid url format (e.g. https://xyz.com)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
