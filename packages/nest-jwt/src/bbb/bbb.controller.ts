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
import { BbbService } from './bbb.service'
import { CreateBbbDto } from './dto/create-bbb.dto'
import { UpdateBbbDto } from './dto/update-bbb.dto'

@Controller('bbb')
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  @UseGuards(AclGuard)
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto)
  }

  @Get()
  @UseGuards(AclGuard, PermissionGuard)
  @SetMetadata('permission', 'query_bbb')
  findAll() {
    return this.bbbService.findAll()
  }

  @Get(':id')
  @UseGuards(AclGuard)
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id)
  }

  @Patch(':id')
  @UseGuards(AclGuard)
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto)
  }

  @Delete(':id')
  @UseGuards(AclGuard)
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id)
  }
}
