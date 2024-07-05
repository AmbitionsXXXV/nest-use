import { Controller, Get, Inject, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AppService } from './app.service'
import { LoginGuard } from './login.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private configService: ConfigService

  @Get()
  getHello() {
    return {
      // band: this.configService.get('band'),

      // 使用 ts 的 config
      db: this.configService.get('db'),
      singer: this.configService.get('singer'),
      name: this.configService.get('singer.name'),
    }
  }

  @Get('aaa')
  aaa() {
    return 'aaa'
  }

  @Get('bbb')
  @UseGuards(LoginGuard)
  bbb() {
    return 'bbb'
  }
}
