import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HelloJsonResponseDTO } from './dto/hello-json-response.dto';
import { HelloStringResponseDTO } from './dto/hello-string-response.dto';
import { HelloService } from './hello.service';

@ApiTags('Hello')
@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  // curl -X GET http://localhost:3000/hello/string
  @ApiOperation({ summary: 'Get Hello String' })
  @ApiProduces('text/plain')
  @ApiResponse({
    status: 200,
    description: 'Hello String',
    type: HelloStringResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Get('string')
  getHelloStringRest(): HelloStringResponseDTO {
    return this.helloService.getHelloString();
  }

  // curl -X GET http://localhost:3000/hello/json | jq
  @ApiOperation({ summary: 'Get Hello JSON' })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'Hello JSON',
    type: HelloJsonResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Get('json')
  getHelloJsonRest(): HelloJsonResponseDTO {
    return this.helloService.getHelloJson();
  }
}
