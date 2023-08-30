import { Test, TestingModule } from '@nestjs/testing';
import { CommitMessageAnswerDTO } from './commit-message-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('CommitMessageAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [CommitMessageAnswerDTO],
    }).compile();
  });

  describe('Commit message', () => {
    it('should validate a valid commit message', async () => {
      const dto = new CommitMessageAnswerDTO(
        '[PPP-1234] feat: implemented new feature: user authentication.',
      );
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: CommitMessageAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid commit message', async () => {
      const dto = new CommitMessageAnswerDTO('invalid-message');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: CommitMessageAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid commit message format (e.g. [PPP-1234] feat: implemented new feature: user authentication.)',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
