import { Test, TestingModule } from '@nestjs/testing';
import { TeamIdAnswerDTO } from './team-id-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('TeamIdAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TeamIdAnswerDTO],
    }).compile();
  });

  describe('ID', () => {
    it('should validate a valid team ID', async () => {
      const dto = new TeamIdAnswerDTO('xyz.team');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TeamIdAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid team ID', async () => {
      const dto = new TeamIdAnswerDTO('invalid-id');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TeamIdAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid team ID format (e.g. xyz.team)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
