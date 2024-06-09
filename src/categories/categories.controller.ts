import { Controller, Get, Post, Body} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto)
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('seeder')
  addCategory(){
    return this.categoriesService.addCategory()
  }

}
