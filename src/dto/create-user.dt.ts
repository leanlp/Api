import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fec_alta: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  codigo_zip: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  credit_card_num: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  credit_card_ccv: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cuenta_numero: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  geo_latitud: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  geo_longitud: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color_favorito: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  foto_dni: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ip: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  auto: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  auto_modelo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  auto_tipo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  auto_color: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cantidad_compras_realizadas: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fec_birthday: string;
}
