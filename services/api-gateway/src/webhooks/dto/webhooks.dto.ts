import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl, IsOptional, IsBoolean, IsArray } from 'class-validator'

export class CreateWebhookDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsUrl()
  url: string

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  events: string[]

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string
}

export class UpdateWebhookDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  url?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  events?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string
}