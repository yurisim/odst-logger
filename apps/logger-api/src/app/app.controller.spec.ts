import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';


describe('AppController (Additional Tests)', () => {
  let appController: AppController
  let appService: AppService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = module.get<AppController>(AppController)
    appService = module.get<AppService>(AppService)
  })

  describe('getHello', () => {
    it('should return the correct message object', () => {
      const result = appController.getHello()
      expect(result).toEqual({ message: 'Hello DOU :)' })
    })

    it('should call appService.getData()', () => {
      jest.spyOn(appService, 'getHello')
      appController.getHello()
      expect(appService.getHello).toHaveBeenCalled()
    })
  })

  describe('edge cases', () => {
    it('should handle empty response from appService', () => {
      jest.spyOn(appService, 'getHello').mockReturnValue({ message: '' });
      const result = appController.getHello()
      expect(result).toEqual({ message: '' })
    })

    it('should handle null response from appService', () => {
      jest.spyOn(appService, 'getHello').mockReturnValue({ message: null });
      const result = appController.getHello()
      expect(result).toEqual({ message: null })
    })
  })
})
