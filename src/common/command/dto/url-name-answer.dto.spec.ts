import { Test, TestingModule } from '@nestjs/testing';
import { UrlNameAnswerDTO } from './url-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('UrlNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UrlNameAnswerDTO],
    }).compile();
  });

  describe('url name', () => {
    it('should validate a valid url name', async () => {
      const dto = new UrlNameAnswerDTO('EXAMPLE');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: UrlNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid url name', async () => {
      const dto = new UrlNameAnswerDTO('invalid-url-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: UrlNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: [
            'Please enter a valid URL name in the type of WIKI, JIRA, CONFLUENCE, GITHUB, GITLAB, BITBUCKET, TRELLO, ASANA, NOTION, PRD, DESIGN, HLD, LLD, CODE, TEST, DEPLOY, RELEASE, MONITOR, OTHER, EXTERNAL, INTERNAL, EXAMPLE',
          ],
          error: 'Bad Request',
        });
      }
    });
  });
});
