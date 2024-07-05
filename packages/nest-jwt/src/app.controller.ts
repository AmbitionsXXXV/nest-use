import {
  Controller,
  Get,
  Headers,
  Inject,
  Res,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { AppService } from './app.service'
import { LoginGuard } from './login.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService

  @Get()
  @UseGuards(LoginGuard)
  getHello(): string {
    return this.appService.getHello()
  }

  // jwt 的使用
  @Get('jwt')
  getJwt(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (authorization) {
      try {
        const token = authorization.split(' ')[1]
        const data = this.jwtService.verify(token)

        const newToken = this.jwtService.sign({
          count: data.count + 1,
        })
        response.setHeader('token', newToken)
        return data.count + 1
      } catch (e) {
        console.log(e)
        throw new UnauthorizedException()
      }
    } else {
      const newToken = this.jwtService.sign({
        count: 1,
      })

      response.setHeader('token', newToken)
      return 1
    }
  }

  // session 和 cookie 的使用
  @Get('session')
  getSession(@Session() session) {
    // 每次访问都会打印 session，并且 count 会自增
    console.log('session', session)
    session.count = session.count ? session.count + 1 : 1

    return session.count
  }
}
