import { PickType } from "@nestjs/swagger";
import { UsersDto } from "src/users/users.dto"; 
export class AuthCredentialsDto extends PickType(UsersDto,['email','password']){
    

}