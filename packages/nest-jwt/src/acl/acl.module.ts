import { Module } from '@nestjs/common'
import { AclController } from './acl.controller'
import { AclService } from './acl.service'
import { PermissionGuard } from './permission.guard'

@Module({
  controllers: [AclController],
  providers: [AclService, PermissionGuard],
  exports: [AclService, PermissionGuard],
})
export class AclModule {}
