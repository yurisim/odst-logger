import { Controller, Get, Logger, Param, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) { }

  @Get('hello')
  getHello() {
    this.logger.log('Hello DOU endpoint was called');
    return this.appService.getHello();
  }

  // hello a person
  @Get('hello/:name')
  getHelloName(@Param('name') name: string) {
    this.logger.log(`Hello ${name} endpoint was called`);
    try {
      return this.appService.getHelloName(name);
    } catch (error) {
      this.logger.error(`Error in getHelloPerson: ${error.message}`, error.stack);
      throw error; // Let the exception filter handle it
    }
  }
}
