import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

describe('HelloController', () => {
  let helloController: HelloController;
  let helloService: HelloService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    helloService = moduleRef.get<HelloService>(HelloService);
    helloController = moduleRef.get<HelloController>(HelloController);
  });

  describe('getHelloString', () => {
    it('should return Hello World string', () => {
      const expectedResult = 'Hello World!';
      jest
        .spyOn(helloService, 'getHelloString')
        .mockReturnValue(expectedResult);

      const result = helloController.getHelloString();

      expect(result).toBe(expectedResult);
      expect(helloService.getHelloString).toHaveBeenCalled();
    });
  });

  describe('getHelloJson', () => {
    it('should return Hello World JSON', () => {
      const expectedResult = { message: 'Hello World!' };
      jest.spyOn(helloService, 'getHelloJson').mockReturnValue(expectedResult);

      const result = helloController.getHelloJson();

      expect(result).toEqual(expectedResult);
      expect(helloService.getHelloJson).toHaveBeenCalled();
    });
  });
});
