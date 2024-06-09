import { Controller, Get,Body, Post,UseInterceptors,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/users/users.dto';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { AuthCredentialsDto } from './authCredentials.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ApiBody, ApiHideProperty, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';



@ApiTags('AUTH')

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService){}



    @Post('signUp') 
    @ApiOperation({
        description:'Registra Un Usuario'
    })
    @ApiBody({
        type:UsersDto,
        description:'Registra un usuario usando UsersDto',
        examples:{
            ejemplo1:{
                value:{
                    "name":"enrrique quintero",
                    "email":"quintero@gmail.com",
                    "password":"1234",
                    "confirmPassword":"1234",
                    "phone":"3003001794",
                    "address":"buenos aires",
                    "country":"colombia",
                    "city":"barranquilla"
                }                             
            },
            ejemplo2:{
                value:{
                    "name":"rafael orozco",
                    "email":"orozco@gmail.com",
                    "password":"1234",
                    "confirmPassword":"1234",
                    "phone":"3003241794",
                    "address":"el santuario",
                    "country":"colombia",
                    "city":"barranquilla"
                }
            }
        }   
    })
    @ApiResponse({
            status:201,
            description:'El registro fue exitoso'
    })
    @ApiResponse({
        status:409,
        description:'El email ya existe en esta base de datos   '
    })
    @UseInterceptors(DateAdderInterceptor)     
    signUp(@Body() users:UsersDto,@Req() request:Request & {now:string}){ 
        const {password,confirmPassword} = users;
        if(password !== confirmPassword){
            return 'Passwords No Coinciden';
        }
        const modifiUsers={...users, createdAt:request.now}
        const {name}=users;
       
        const formato = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
             const nameValido = formato.test(name)
             if(nameValido){
                return "El nombre Tiene Caracteres Especiales no validos";
             }

             try {
                return this.authService.signUp(modifiUsers);    
             } catch (error) {
                 throw new ExceptionsHandler; 
             }      
          
    }    

@Post('signIn')   
@ApiOperation({
    description:'Logguea Un Usuario'
})
@ApiBody({
    type:UsersDto,
    description:'Logguea un usuario usando UsersDto',
    examples:{
        ejemplo1:{
            value:{
             
                "email":"quintero@gmail.com",
                "password":"1234",
              
            }                             
        },
        ejemplo2:{
            value:{
             
                "email":"orozco@gmail.com",
                "password":"1234",
            
            }
        }
    }   
})
@ApiResponse({
        status:201,
        description:'El Usuario Se Loggeo con exitoso'
})
@ApiResponse({
    status:401,
    description:'Credenciales Invalidas'
}) 
async signIn(@Body() userCredentials:AuthCredentialsDto){   
  const dbCRedentials = await this.authService.signIn(userCredentials.email,userCredentials.password);
  return dbCRedentials;
}

}
