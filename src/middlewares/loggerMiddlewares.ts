import { NextFunction, Request, Response } from 'express';

export function loggerMiddlewares(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const actualDate = new Date();
  const date = actualDate.toLocaleDateString();
  const time = actualDate.toLocaleTimeString();
  console.log(`${req.method}  ${req.url}  ---  ${date} : ${time} `);
  next();
}
