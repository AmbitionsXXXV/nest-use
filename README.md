# Projects

## /nest-winston

基于 Winston 实现自定义 Logger,使用 printf 自定义保持 nest 原本日志格式，使用 dayjs + chalk 自定义 winston 的日志格式

json 格式打印到 File 日志

封装动态 module，在 forRoot 方法里传入 options，module 內创建 winston 的 logger 实例并声明这个模块为全局模块

得以在应用内随处可以注入自定义的基于 winston 的 CusLogger

## /redis-nest

Use redis in nest
