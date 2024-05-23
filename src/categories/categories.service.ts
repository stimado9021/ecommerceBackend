import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Categories } from './categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json'

@Injectable()
export class CategoriesService {

 constructor(
  @InjectRepository(Categories)
  private categoryRepositorio:Repository<Categories>,
) {}
 
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepositorio.save(createCategoryDto)
  }

 async addCategory(){
    data?.map(async (element)=>{
      await this.categoryRepositorio.createQueryBuilder()
                                    .insert()
                                    .into(Categories)
                                    .values({name:element.category})
                                    .orIgnore()
                                    .execute()
    })
    return "categories add";
  }
    

  async findAll() {
    return await this.categoryRepositorio.find();
  }

}
