import { Module } from '@nestjs/common'
import { AclModule } from 'src/acl/acl.module'
import { BbbController } from './bbb.controller'
import { BbbService } from './bbb.service'

@Module({
  imports: [AclModule],
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule {}
