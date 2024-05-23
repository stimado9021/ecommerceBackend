import { BadRequestException, Injectable } from '@nestjs/common';
import { authRepository } from './auth.repository';

import { UsersDBService } from 'src/users/usersDb.service';
import { UsersDto } from 'src/users/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository:authRepository,
        private readonly usersDbService:UsersDBService,
        private readonly jwtService:JwtService
    ){}

 async getAuth(){
       return await this.authRepository.getAuth();
    }

  async  signUp(users:UsersDto){
        const {email}=users
        const founderUser = await this.usersDbService.getUsersByEmail(email)        
        if(founderUser) throw new BadRequestException('El Email ya esta registrado');
       const hashedPassword = await bcrypt.hash(users.password,10)     
      
        const newUser = await this.usersDbService.createUsers({...users,password:hashedPassword})
        if(!newUser) {
            throw new BadRequestException('Credentiasl Invalid Email Duplicado')
        }
        return newUser;
    }

   async signIn(email:string,password:string){
      const dbCRedentials = await this.usersDbService.getUsersByEmail(email)
      if(!dbCRedentials) {
         throw new BadRequestException('User not found')
      }
     
   
        const isPasswordValid = await bcrypt.compare(password,dbCRedentials.password)
        
        if(!isPasswordValid){
            throw new BadRequestException('Credentiasl Invalid')
        }

        const userPayload={
            sub:dbCRedentials.id,
            id:dbCRedentials.id,
            email:dbCRedentials.email,
            isAdmin:dbCRedentials.isAdmin
        }
        const token= await this.jwtService.sign(userPayload)
      return {success:'user logged in successfully',token};     
    }

}
