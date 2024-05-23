import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  id: string;

  @ApiProperty({
    description: 'propiedad name',
    example: 'cerveza negra',
  })
  name: string;
}
