import { Injectable, OnModuleInit } from '@nestjs/common';
import { HelloStringResponseDTO } from './dto/hello-string-response.dto';
import { HelloJsonResponseDTO } from './dto/hello-json-response.dto';
// import { Response } from 'express';

@Injectable()
export class HelloService {
  getHelloString(): HelloStringResponseDTO {
    const helloStringResponse: HelloStringResponseDTO = 'Hello World!';
    return helloStringResponse;
  }

  getHelloJson(): HelloJsonResponseDTO {
    const helloJsonResponse: HelloJsonResponseDTO = {
      data: { message: 'Hello, world!' },
    };
    return helloJsonResponse;
  }
}
