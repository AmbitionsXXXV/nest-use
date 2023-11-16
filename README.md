# Projects

## [nest-winston](https://github.com/AmbitionsXXXV/nest-use/tree/main/nest-winston)

基于 Winston 实现自定义 Logger,使用 printf 自定义保持 nest 原本日志格式，使用 dayjs + chalk 自定义 winston 的日志格式

json 格式打印到 File 日志

封装动态 module，在 forRoot 方法里传入 options，module 內创建 winston 的 logger 实例并声明这个模块为全局模块

得以在应用内随处可以注入自定义的基于 winston 的 CusLogger

## [redis-nest](https://github.com/AmbitionsXXXV/nest-use/tree/main/redis-nest)

Use redis in nest

## [nest-jwt](https://github.com/AmbitionsXXXV/nest-use/tree/main/nest-jwt)

使用 `typeorm` `@nestjs/jwt` `class-validator` `class-transformer` `mysql2` 等实现的一个简单的带校验规则用户注册登录功能

参数的校验使用 `ValidationPipe` + `class-validator` 来实现

以及实现 `ACL(Access Control List)`

## [nest-rbac](https://github.com/AmbitionsXXXV/nest-use/tree/main/nest-rbac)

使用 `typeorm` `@nestjs/jwt` `class-validator` `class-transformer` `mysql2` 等实现的一个简单的 `RBAC(Role-Based Access Control)` 权限管理系统

参数的校验使用 `ValidationPipe` + `class-validator` 来实现

## [nest-double-token](https://github.com/AmbitionsXXXV/nest-use/tree/main/nest-double-token)

使用 `access-token` `refresh-token` 实现的一个简单的 `JWT` 双令牌认证系统
