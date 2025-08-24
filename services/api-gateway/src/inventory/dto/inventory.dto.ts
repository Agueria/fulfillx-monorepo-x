import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsObject, IsOptional, IsEnum } from 'class-validator'

export class CreateSkuDto {
  @ApiProperty()
  @IsString()
  sku: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  weight?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  dimensions?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  attributes?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  barcode?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string
}

export class UpdateSkuDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  weight?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  dimensions?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  attributes?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  barcode?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  category?: string
}

export class AdjustInventoryDto {
  @ApiProperty()
  @IsString()
  skuId: string

  @ApiProperty()
  @IsString()
  warehouseId: string

  @ApiProperty()
  @IsNumber()
  quantity: number

  @ApiProperty()
  @IsEnum(['ADJUSTMENT', 'RECEIVED', 'DAMAGED', 'LOST', 'SOLD', 'RETURNED'])
  type: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reference?: string
}