import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [
    // 局部注册 config
    ConfigModule.forFeature(() => {
      return {
        band: 'oor',
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
