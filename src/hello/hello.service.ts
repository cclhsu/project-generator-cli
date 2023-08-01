import { Injectable, OnModuleInit } from '@nestjs/common';
import { HelloStringResponseDto } from './dto/hello-string-response.dto';
import { HelloJsonResponseDto } from './dto/hello-json-response.dto';
// import { Response } from 'express';

@Injectable()
export class HelloService {
  getHelloString(): HelloStringResponseDto {
    const helloStringResponse: HelloStringResponseDto = 'Hello World!';
    return helloStringResponse;
  }

  getHelloJson(): HelloJsonResponseDto {
    const helloJsonResponse: HelloJsonResponseDto = {
      data: { message: 'Hello, world!' },
    };
    return helloJsonResponse;
  }
}
