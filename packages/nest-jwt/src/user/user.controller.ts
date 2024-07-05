import { Body, Controller, Inject, Post, Res, ValidationPipe } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService

  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const foundUser = await this.userService.login(user)

    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: user.username,
        },
      })

      res.setHeader('token', token)

      return '登录成功'
    }

    return '登录失败'
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterUserDto) {
    return await this.userService.register(user)
  }
}
