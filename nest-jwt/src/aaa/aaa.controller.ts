import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common'
import { AclGuard } from 'src/acl.guard'
import { PermissionGuard } from 'src/acl/permission.guard'
import { AaaService } from './aaa.service'
import { CreateAaaDto } from './dto/create-aaa.dto'
import { UpdateAaaDto } from './dto/update-aaa.dto'

@Controller('aaa')
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  @UseGuards(AclGuard)
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto)
  }

  @Get()
  @UseGuards(AclGuard, PermissionGuard)
  @SetMetadata('permission', 'query_aaa')
  findAll() {
    return this.aaaService.findAll()
  }

  @Get(':id')
  @UseGuards(AclGuard)
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(AclGuard)
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto)
  }

  @Delete(':id')
  @UseGuards(AclGuard)
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id)
  }
}
