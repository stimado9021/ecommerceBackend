import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorators';
export class UsersDto {

  @ApiProperty({
    description: 'propiedad name',
    example: 'rafael'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Matches(
    '/^[0-9A-F]{8}-[0-9A-F]{4}-[0-5][0-9A-F]{3}-[089ab][0-9A-F]{3}-[0-9A-F]{12}$/i',
  )
  name: string;


  @ApiProperty({
    description: 'propiedad email',
    example: 'rorozco@gmail.com'
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  email: string;

  @ApiProperty({
    description: 'propiedad password',
    example: '1234'
  })
  
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  @IsStrongPassword()
  @Matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[!@#$%^&*]).{8,15}$/,
   {message: 'password too weak',
   })
  password: string;


  @ApiProperty({
    description: 'propiedad confirmPassword',
    example: '1234'
  })
  @IsString()
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    description: 'propiedad phone',
    example: '3003001794'
  })
  @IsNumber()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'propiedad country',
    example: 'colombia'
  })
  @IsString()
  country: string;


  @ApiProperty({
    description: 'propiedad address',
    example: 'soledad barranquilla call 54 28#90'
  })
  @IsString()
  @IsOptional()
  address?: string | undefined;

  @ApiHideProperty()  
  roles: string;

  @ApiProperty({
    description: 'propiedad city',
    example: 'barranquilla'
  })
  @IsOptional()
  @IsString()
  city?: string | undefined;

  @ApiHideProperty()
  createdAt?: string | undefined;
}
