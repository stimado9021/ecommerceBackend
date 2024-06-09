import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';

import { Roles } from 'src/decorators/roles.decorators';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/users/roles.enum';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
@ApiTags('UPLOADFILES')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @ApiConsumes('multipart/form-data')
  @Roles(Role.superAdmin,Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param('id', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000,
            message: 'excede el maximo en bytes Permitido',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg|gif)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }


  @Post('uploadImageUser/:id')
  @ApiConsumes('multipart/form-data')
  @Roles(Role.superAdmin,Role.Admin)
 // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadImageUser(
    @Param('id', ParseUUIDPipe) userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2000000,
            message: 'excede el maximo en bytes Permitido',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|svg|gif)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImageUser(file, userId);
  }



}
