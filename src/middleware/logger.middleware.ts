import { NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

export class LogguerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`ejecutando el loggerMiddleware con el metodo ${req.method} en la ruta ${req.baseUrl}`);
        next();
    }
}

export function LoggerGlobalMiddleware(
    req: Request, res: Response, next: NextFunction
){
    console.log(`ejecutando el loggerMiddleware con el metodo ${req.method} en la ruta ${req.originalUrl}`);
        next();
}
