import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './upload.repository';
import { Products } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, producId: string) {
    const product = await this.productsRepository.findOneBy({ id: producId });

    if (!product)
      throw new NotFoundException(`producto con id ${producId} no encontrado`);

    const response = await this.fileUploadRepository.uploadImage(file);
    console.log(response.secure_url);

    await this.productsRepository.update(producId, {
      imgUrl: response.secure_url,
    });

    const foundProduct = await this.productsRepository.findOneBy({
      id: producId,
    });

    return foundProduct;
  }
}
