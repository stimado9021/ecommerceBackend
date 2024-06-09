import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailOrdersService } from './detail-orders.service';
import { CreateDetailOrderDto } from './dto/create-detail-order.dto';
import { UpdateDetailOrderDto } from './dto/update-detail-order.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('DETAILSORDERS')
@Controller('detail-orders')
export class DetailOrdersController {
  constructor(private readonly detailOrdersService: DetailOrdersService) {}

  @Post()
  create(@Body() createDetailOrderDto: CreateDetailOrderDto) {
    return this.detailOrdersService.create(createDetailOrderDto);
  }

  @Get()
  findAll() {
    return this.detailOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailOrderDto: UpdateDetailOrderDto) {
    return this.detailOrdersService.update(+id, updateDetailOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailOrdersService.remove(+id);
  }
}
