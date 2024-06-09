import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome Correction FT48 May 15 of 2024';
  }
}
