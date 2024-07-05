import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { RedisService } from 'src/redis/redis.service'
import { AclService } from './acl.service'

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(AclService)
  private aclService: AclService

  @Inject(Reflector)
  private reflector: Reflector

  @Inject(RedisService)
  private redisService: RedisService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const user = request.session.user
    if (!user) {
      throw new UnauthorizedException('用户未登录')
    }

    let permissions = await this.redisService.listGet(
      `user_${user.username}_permissions`,
    )

    // 先查询 redis、没有再查数据库并存到 redis，有的话就直接用 redis 的缓存结果
    // 使用 redis 的缓存结果是为了减少对数据库的访问，否则每次都会做一次三表关联的数据库查询
    if (permissions.length === 0) {
      const foundUser = await this.aclService.findByUsername(user.username)
      permissions = foundUser.permissions.map((item) => item.name)

      // 30 分钟过期
      this.redisService.listSet(
        `user_${user.username}_permissions`,
        permissions,
        60 * 30,
      )
    }

    const permission = this.reflector.get('permission', context.getHandler())

    if (permissions.some((item) => item === permission)) {
      return true
    } else {
      throw new UnauthorizedException('没有权限访问该接口')
    }
  }
}
