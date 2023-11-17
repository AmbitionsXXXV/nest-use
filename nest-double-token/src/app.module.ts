import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
// import * as path from 'node:path'
// 同样支持使用 ts config
import config from 'config'
import config2 from 'config/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from './user/entities/user.entity'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    // ConfigModule.forRoot(),
    // 如果有多个配置文件
    ConfigModule.forRoot({
      // 如果有其他动态模块需要使用到配置文件，需要设置 isGlobal 为 true
      isGlobal: true,
      // envFilePath: [
      //   path.join(process.cwd(), '.mysql.env'),
      //   path.join(process.cwd(), '.env'),
      // ],

      // 后面的配置相同的 key 会覆盖前面的
      load: [config, config2],
    }),
    JwtModule.register({
      secret: 'oor',
      global: true,
      signOptions: {
        expiresIn: '30m',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'etc123456',
      database: 'double-token',
      entities: [User],
      synchronize: true,
      logging: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
