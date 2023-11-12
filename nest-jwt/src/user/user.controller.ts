import { Body, Controller, Inject, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from './dto/longin-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService

  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return await this.userService.login(user)
  }

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    return await this.userService.register(user)
  }
}
