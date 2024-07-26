import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello DOU :)' };
  }

  getHelloPerson(name: string) {
    if (!name || name.trim().length === 0) {
      throw new BadRequestException('Name cannot be empty');
    }
    // Additional business logic...
    return `Hello, ${name}!`;
  }
}

