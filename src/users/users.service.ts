import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.interface';


@Injectable()
export class UsersService {
   constructor(private readonly usersRepository:UsersRepository){}

   async getUsers(page:number,limit:number){
    
    return  await this.usersRepository.getUsers(page,limit)
       
    }

    getUsersById(id:string){       
        return this.usersRepository.getUsersById(Number(id))
    }
    getUsersByIdByName(id:string,name:string){
            return this.usersRepository.getUsersByIdByName(Number(id),name)
    }
    getUsersByName(name:string){
        return this.usersRepository.getUsersByName(name)
    }   

    createUsers(user:User){
        return this.usersRepository.createUsers(user)
    }
}
