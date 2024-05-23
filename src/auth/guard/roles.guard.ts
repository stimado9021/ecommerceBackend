import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      'roles', 
    [ context.getHandler(), context.getClass(), ]
  );
    
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
   console.log(requiredRoles[0]==user.roles) 
   console.log(requiredRoles[0]+'=='+user.roles) 
    
    const valid = user && user.roles && (requiredRoles[0]==user.roles);
   
    if (!valid) {
      throw new ForbiddenException(
        'No tiene permiso para  acceder a esta ruta',
      );
    }
    return true;
  }
}
