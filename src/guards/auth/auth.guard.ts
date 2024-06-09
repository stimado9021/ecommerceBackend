import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): any | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
   
    if (!token) throw new UnauthorizedException('Se necesita token para continuar');
    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      if (!user) throw new UnauthorizedException('Error al Validar Token');
      user.exp = new Date(user.exp * 1000);
      //user.roles = user.isAdmin ? [Role.Admin] : [Role.User];
      user.roles = user.role; 
      request.user = user;
    
    } catch (error) {
      throw new BadRequestException('token expired refresh')
    }
    
    console.log('paso por aqui hoy');
    
    
    
    
   
      
   

    // validate(request)
    return true;
  }
}
