import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    console.log(token);
    if (!token)
      throw new UnauthorizedException('Se necesita token para continuar');
    const secret = process.env.JWT_SECRET;
    const user = this.jwtService.verify(token, { secret });
    if (!user) throw new UnauthorizedException('Error al Validar Token');
    console.log(user);
    user.exp = new Date(user.exp * 1000);
    user.roles = user.isAdmin ? [Role.Admin] : [Role.User];
    request.user = user;

    // validate(request)
    return true;
  }
}
