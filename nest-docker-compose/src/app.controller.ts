import { Controller, Get, Inject } from '@nestjs/common'
import { RedisClientType } from 'redis'
import { AppService } from './app.service'

@Controller()
export class AppController {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType

  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const keys = await this.redisClient.keys('*')
    console.log(keys)

    return this.appService.getHello()
  }
}
