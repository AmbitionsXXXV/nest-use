import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { createClient } from 'redis'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { Band } from './band.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'etc123456',
      database: 'docker-compose',
      entities: [Band],
      synchronize: true,
      logging: true,
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: { host: 'localhost', port: 6379 },
        })

        await client.connect()
        return client
      },
    },
  ],
})
export class AppModule {}
