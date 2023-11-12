import { Body, Controller, Get, Post, Session } from '@nestjs/common'
import { AclService } from './acl.service'
import { LoginAclDto } from './dto/login-acl.dto'

@Controller('acl')
export class AclController {
  constructor(private readonly aclService: AclService) {}

  @Get('init')
  async initData() {
    await this.aclService.initData()
    return 'done'
  }

  @Post('login')
  async login(@Body() loginAcl: LoginAclDto, @Session() session) {
    const acl = await this.aclService.login(loginAcl)

    session.user = {
      username: acl.username,
    }

    return 'success'
  }
}
