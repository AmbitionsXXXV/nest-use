import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { EntityManager } from 'typeorm'
import { LoginAclDto } from './dto/login-acl.dto'
import { Acl } from './entities/acl.entity'
import { Permission } from './entities/permission.entity'

@Injectable()
export class AclService {
  @InjectEntityManager()
  entityManager: EntityManager

  async findByUsername(username: string) {
    const acl = await this.entityManager.findOne(Acl, {
      where: {
        username,
      },
      relations: {
        permissions: true,
      },
    })

    return acl
  }

  async login(loginAclDto: LoginAclDto) {
    const acl = await this.entityManager.findOneBy(Acl, {
      username: loginAclDto.username,
    })

    if (!acl) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED)
    }

    if (acl.password !== loginAclDto.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED)
    }

    return acl
  }

  async initData() {
    const permission1 = new Permission()
    permission1.name = 'create_aaa'
    permission1.desc = '新增 aaa'

    const permission2 = new Permission()
    permission2.name = 'update_aaa'
    permission2.desc = '修改 aaa'

    const permission3 = new Permission()
    permission3.name = 'remove_aaa'
    permission3.desc = '删除 aaa'

    const permission4 = new Permission()
    permission4.name = 'query_aaa'
    permission4.desc = '查询 aaa'

    const permission5 = new Permission()
    permission5.name = 'create_bbb'
    permission5.desc = '新增 bbb'

    const permission6 = new Permission()
    permission6.name = 'update_bbb'
    permission6.desc = '修改 bbb'

    const permission7 = new Permission()
    permission7.name = 'remove_bbb'
    permission7.desc = '删除 bbb'

    const permission8 = new Permission()
    permission8.name = 'query_bbb'
    permission8.desc = '查询 bbb'

    const user1 = new Acl()
    user1.username = 'aimyon'
    user1.password = '3636'
    user1.permissions = [permission1, permission2, permission3, permission4]

    const user2 = new Acl()
    user2.username = 'oor'
    user2.password = '10969'
    user2.permissions = [permission5, permission6, permission7, permission8]

    await this.entityManager.save([
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ])
    await this.entityManager.save([user1, user2])
  }
}