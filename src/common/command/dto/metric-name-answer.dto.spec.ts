import { Test, TestingModule } from '@nestjs/testing';
import { MetricNameAnswerDTO } from './metric-name-answer.dto';
import { ValidationPipe } from '@nestjs/common';

describe('MetricNameAnswerDTO', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [MetricNameAnswerDTO],
    }).compile();
  });

  describe('metric name', () => {
    it('should validate a valid metric name', async () => {
      const dto = new MetricNameAnswerDTO('XYZ Metric');
      const validationPipe = new ValidationPipe();
      const validatedDto = await validationPipe.transform(dto, {
        metatype: MetricNameAnswerDTO,
        type: 'body',
        data: '',
      });

      expect(validatedDto).toEqual(dto);
    });

    it('should throw an error for an invalid metric name', async () => {
      const dto = new MetricNameAnswerDTO('invalid-metric-name');
      const validationPipe = new ValidationPipe();

      try {
        await validationPipe.transform(dto, {
          metatype: MetricNameAnswerDTO,
          type: 'body',
          data: '',
        });
      } catch (error: any) {
        // console.log(error.getResponse());
        expect(error.getResponse()).toEqual({
          statusCode: 400,
          message: ['Please enter a valid metric name format (e.g. XYZ Metric)'],
          error: 'Bad Request',
        });
      }
    });
  });
});
