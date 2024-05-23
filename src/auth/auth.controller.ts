import { Controller, Get,Body, Post,UseInterceptors,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from 'src/users/users.dto';
import { DateAdderInterceptor } from 'src/interceptors/date-adder.interceptor';
import { AuthCredentialsDto } from './authCredentials.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService){}


@Get()
    getAuth(){
        return this.authService.getAuth();
    }
   
    @Post('signUp') 
    @UseInterceptors(DateAdderInterceptor)   
    signUp(@Body() users:UsersDto,@Req() request:Request & {now:string}){ 
        const modifiUsers={...users, createdAt:request.now}
             try {
                return this.authService.signUp(modifiUsers);    
             } catch (error) {
                 throw new ExceptionsHandler; 
             }      
          
    }    

@Post('signIn')    
async signIn(@Body() userCredentials:AuthCredentialsDto){   
  const dbCRedentials = await this.authService.signIn(userCredentials.email,userCredentials.password);
  return dbCRedentials;
}

}
