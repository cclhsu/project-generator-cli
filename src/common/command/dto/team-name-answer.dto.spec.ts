import { Test, TestingModule } from '@nestjs/testing';
import { TeamNameAnswerDTO } from './team-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('TeamNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [TeamNameAnswerDTO],
    }).compile();
  });

  describe('team name', () => {
    it('should validate a valid team name', async () => {
      const dto = new TeamNameAnswerDTO('XYZ Team');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: TeamNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid team name', async () => {
      const dto = new TeamNameAnswerDTO('invalid-team-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: TeamNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid team name format (e.g. XYZ Team)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
