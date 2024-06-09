import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class ProductsDto {

  @ApiProperty({
    description: 'propiedad name',
    example: 'cerveza andina'
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'propiedad description',
    example: 'cerveza tipo pilsen contenido 220 mls'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'propiedad price',
    example: '4290.90'
  })
  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'propiedad stock',
    example: '200'
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'propiedad imgUrl',
    example: 'https://res.cloudinary.com/dadwg3dgb/image/upload/v1715469250/iiojxwlgq5n6lt0v1tvj.jpg'
  })
  @IsString()
  imgUrl: string;
  
  @ApiHideProperty()
  createdAt: string;
}
