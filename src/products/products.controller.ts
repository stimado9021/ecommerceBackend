import {
  Controller,
  Get,
  Req,
  Query,
  Param,
  Post,
  Body,
  UseInterceptors,
  ParseUUIDPipe,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
//import { ProductsDto } from './products.dto';
//import { Products } from './products.entity';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { ProductsDto } from './products.dto';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/users/roles.enum';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Get()
  getProducts(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.productsService.getProducts(page, limit);
  }

  @Get('seeder')
  async addProducts() {
    await this.productsService.addProducts();
  }
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  getProductsById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductsId(id);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(DateAdderInterceptor)
  createProducts(
    @Body() products: ProductsDto,
    @Req() request: Request & { now: string },
  ) {
    const modifiProduct = { ...products, createdAt: request.now };
    return this.productsService.createProducts(modifiProduct);
  }
}
