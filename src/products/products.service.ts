import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsDto } from './products.dto';
import { Categories } from 'src/categories/categories.entity';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoryRepositorio: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    console.log(page);
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProductsId(id: string) {
    const product =await this.productsRepository.findOneBy({ id });
    console.log(product)
    if (!product) {
      return `product for  the id  ${id}  no found`;
    }
    return product;
  }

  async addProducts() {
    const categories = await this.categoryRepositorio.find();
    const now = new Date();
    const formatDate = now.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.stock = element.stock;
      product.imgUrl = element.imgUrl;
      product.createdAt = formatDate;
      product.category = category;

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'imgUrl', 'stock', 'price'], ['name'])
        .execute();
    });
    return 'products add';
  }

  async updateProducts(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updateProduct = await this.productsRepository.findOneBy({
      id,
    });
    return updateProduct;
  }

  async createProducts(modifiProduct: ProductsDto) {
    console.log(modifiProduct);
    return await this.productsRepository.save(modifiProduct);
  }
}
