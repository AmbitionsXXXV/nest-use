import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { AclService } from './acl.service'

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(AclService)
  private aclService: AclService

  @Inject(Reflector)
  private reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const user = request.session.user
    if (!user) {
      throw new UnauthorizedException('用户未登录')
    }

    const foundUser = await this.aclService.findByUsername(user.username)
    console.log('permission', foundUser.permissions)

    const permission = this.reflector.get('permission', context.getHandler())
    console.log('context', permission)

    if (foundUser.permissions.some((item) => item.name === permission)) {
      return true
    } else {
      throw new UnauthorizedException('没有权限访问该接口')
    }
  }
}
