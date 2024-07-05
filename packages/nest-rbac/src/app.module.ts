import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AaaModule } from './aaa/aaa.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BbbModule } from './bbb/bbb.module'
import { LoginGuard } from './login.guard'
import { PermissionGuard } from './permission.guard'
import { Permission } from './user/entities/permission.entity'
import { Role } from './user/entities/role.entity'
import { User } from './user/entities/user.entity'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    JwtModule.register({
      secret: 'oor',
      global: true,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'etc123456',
      database: 'rbac-test',
      entities: [User, Role, Permission],
      synchronize: true,
      logging: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    AaaModule,
    BbbModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
