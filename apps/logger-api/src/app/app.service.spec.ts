import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { BadRequestException } from '@nestjs/common';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getHello()).toEqual({ message: 'Hello DOU :)' });
    });

    it('should return a greeting with the provided name', () => {
      expect(service.getHelloName('John')).toEqual('Hello, John!')
    })

    it('should trim whitespace from the name', () => {
      expect(service.getHelloName('  Alice  ')).toEqual('Hello, Alice!')
    })

    it('should throw BadRequestException for empty name', () => {
      expect(() => service.getHelloName('')).toThrow(BadRequestException)
      expect(() => service.getHelloName('   ')).toThrow(BadRequestException)
    })

    it('should throw BadRequestException for name longer than 10 characters', () => {
      expect(() => service.getHelloName('VeryLongName')).toThrow(BadRequestException)
    })

    it('should throw BadRequestException for name "Brenda" (case-insensitive)', () => {
      expect(() => service.getHelloName('Brenda')).toThrow(BadRequestException)
      expect(() => service.getHelloName('brenda')).toThrow(BadRequestException)
      expect(() => service.getHelloName('BRENDA')).toThrow(BadRequestException)
    })

    it('should accept names up to 10 characters', () => {
      expect(service.getHelloName('Abcdefghij')).toEqual('Hello, Abcdefghij!')
    })
  });
});
