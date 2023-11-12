import { HttpException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as crypto from 'crypto'
import { Repository } from 'typeorm'
import { LoginUserDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'

function md5(str) {
  // 使用 node 内置模块 crypto 加密
  const hash = crypto.createHash('md5')
  hash.update(str)

  return hash.digest('hex')
}

@Injectable()
export class UserService {
  private logger = new Logger()

  @InjectRepository(User)
  private userRepository: Repository<User>

  async login(user: LoginUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    })

    if (!foundUser) {
      throw new HttpException('用户名不存在', 200)
    }

    if (foundUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 200)
    }

    return foundUser
  }

  async register(user: RegisterUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: user.username,
    })

    if (foundUser) {
      throw new HttpException('用户名已存在', 200)
    }

    const newUser = new User()
    newUser.username = user.username
    newUser.password = md5(user.password)

    try {
      await this.userRepository.save(newUser)

      return '注册成功'
    } catch (e) {
      this.logger.error(e, UserService)

      return '注册失败'
    }
  }
}
