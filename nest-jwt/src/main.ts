import { NestFactory } from '@nestjs/core'
import * as session from 'express-session'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(
    session({
      secret: 'etc',
      // resave 为 true 时，每次请求都会重新设置 session cookie，假设你的 cookie 是 10分钟过期，每次请求都会再设置 10分钟
      // 这里为 false，是指只有 session 内容变化的时候才重新设置 cookie，比如你设置了 {foo:bar}，下一次请求才会重新设置 cookie
      resave: false,
      // saveUninitialized: true 表示无论有没有 session cookie，每次请求都设置个 session cookie ，比如没有登录时，也会给你设置一个 session cookie
      saveUninitialized: false,
    }),
  )
  await app.listen(3000)
}
bootstrap()
