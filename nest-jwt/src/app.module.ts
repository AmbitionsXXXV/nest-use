import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AclModule } from './acl/acl.module'
import { Acl } from './acl/entities/acl.entity'
import { Permission } from './acl/entities/permission.entity'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { User } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'oor',
      global: true,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    // JwtModule.registerAsync({
    //   async useFactory() {
    //     await '10969'

    //     return {
    //       secret: 'oor',
    //       signOptions: {
    //         expiresIn: '7d',
    //       },
    //     }
    //   },
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'etc123456',
      database: 'jwt-login',
      entities: [User, Acl, Permission],
      synchronize: true,
      logging: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    AclModule,
    AaaModule,
    BbbModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
