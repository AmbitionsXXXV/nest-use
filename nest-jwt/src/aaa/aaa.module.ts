import { Module } from '@nestjs/common'
import { AclModule } from 'src/acl/acl.module'
import { AaaController } from './aaa.controller'
import { AaaService } from './aaa.service'

@Module({
  imports: [AclModule],
  controllers: [AaaController],
  providers: [AaaService],
})
export class AaaModule {}
