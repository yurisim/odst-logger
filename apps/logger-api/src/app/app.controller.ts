import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
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
  getHelloPerson(name: string) {
    this.logger.log(`Hello ${name} endpoint was called`);
    try {
      return this.appService.getHelloPerson(name);
    } catch (error) {
      this.logger.error(`Error in getHelloPerson: ${error.message}`, error.stack);
      throw error; // Let the exception filter handle it
    }
  }

}
