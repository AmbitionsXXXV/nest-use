import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from './dto/login-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService

  @Inject(ConfigService)
  private configService: ConfigService

  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return {
      band: this.configService.get('band'),
      singer: this.configService.get('singer'),
    }
  }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    const user = await this.userService.login(loginUser)

    const access_token = this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
      },
      {
        expiresIn: '30m',
      },
    )

    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '7d',
      },
    )

    return {
      access_token,
      refresh_token,
    }
  }

  @Get('refresh')
  async refresh(@Query('refresh_token') refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken)

      const user = await this.userService.findUserById(data.userId)
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: '30m',
        },
      )

      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      )

      return {
        access_token,
        refresh_token,
      }
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录')
    }
  }
}
