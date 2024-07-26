import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello DOU :)' };
  }

  getHelloName(name: string) {
    const trimmedName = name.trim();

    if (!trimmedName) {
      throw new BadRequestException('Name cannot be empty');
    }

    if (trimmedName.length > 10) {
      throw new BadRequestException('Name cannot be longer than 10 characters');
    }

    if (trimmedName.toLowerCase() === 'brenda') {
      throw new BadRequestException('Name cannot be Brenda');
    }

    return `Hello, ${trimmedName}!`;
  }
}

