import { Body, Controller, Post } from '@nestjs/common'
import { LoginUserDto } from './dto/longin-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() user: LoginUserDto) {
    console.log(user)
  }

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    return await this.userService.register(user)
  }
}
