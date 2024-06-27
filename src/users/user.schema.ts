import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


@Schema()
export class User extends Document {
  @ApiProperty({ example: '2021-04-04T07:00:50.276Z', description: 'The encrypted date when the user was created' })
  @Prop({ required: true })
  fec_alta: string;

  @ApiProperty({ example: 'Filomena.Collins', description: 'The name of the user' })
  @Prop({ required: true })
  user_name: string;

  @ApiProperty({ example: '17919-7207', description: 'The zip code of the user' })
  @Prop({ required: true })
  codigo_zip: string;

  @ApiProperty({ example: '6393-0943-6424-5954', description: 'The credit card number of the user' })
  @Prop({ required: true })
  credit_card_num: string;

  @ApiProperty({ example: '131', description: 'The CCV of the credit card' })
  @Prop({ required: true })
  credit_card_ccv: string;

  @ApiProperty({ example: '58757891', description: 'The account number of the user' })
  @Prop({ required: true })
  cuenta_numero: string;

  @ApiProperty({ example: 'Mitchell Bypass', description: 'The address of the user' })
  @Prop({ required: true })
  direccion: string;

  @ApiProperty({ example: '-88.3967', description: 'The latitude of the user location' })
  @Prop({ required: true })
  geo_latitud: string;

  @ApiProperty({ example: '-70.5628', description: 'The longitude of the user location' })
  @Prop({ required: true })
  geo_longitud: string;

  @ApiProperty({ example: 'black', description: 'The favorite color of the user' })
  @Prop({ required: true })
  color_favorito: string;

  @ApiProperty({ example: 'http://placeimg.com/640/480', description: 'The photo URL of the user\'s ID' })
  @Prop({ required: true })
  foto_dni: string;

  @ApiProperty({ example: '218.204.159.251', description: 'The IP address of the user' })
  @Prop({ required: true })
  ip: string;

  @ApiProperty({ example: 'Cadillac Volt', description: 'The car of the user' })
  @Prop({ required: true })
  auto: string;

  @ApiProperty({ example: '1', description: 'The model of the car' })
  @Prop({ required: true })
  auto_modelo: string;

  @ApiProperty({ example: 'Coupe', description: 'The type of the car' })
  @Prop({ required: true })
  auto_tipo: string;

  @ApiProperty({ example: 'Jaguar PT Cruiser', description: 'The color of the car' })
  @Prop({ required: true })
  auto_color: string;

  @ApiProperty({ example: '84978', description: 'The number of purchases made by the user' })
  @Prop({ required: true })
  cantidad_compras_realizadas: string;  // Store as string

  @ApiProperty({ example: 'https://cdn.fakercloud.com/avatars/muringa_128.jpg', description: 'The avatar URL of the user' })
  @Prop({ required: true })
  avatar: string;

  @ApiProperty({ example: '2022-03-28T21:18:02.439Z', description: 'The birthdate of the user' })
  @Prop({ required: true })
  fec_birthday: string; // Store as string
}

export const UserSchema = SchemaFactory.createForClass(User);
