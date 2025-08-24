import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsObject, IsOptional, IsArray, IsEnum, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

class AddressDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  line1: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  line2?: string

  @ApiProperty()
  @IsString()
  city: string

  @ApiProperty()
  @IsString()
  state: string

  @ApiProperty()
  @IsString()
  postalCode: string

  @ApiProperty()
  @IsString()
  country: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string
}

class OrderItemDto {
  @ApiProperty()
  @IsString()
  skuId: string

  @ApiProperty()
  @IsString()
  sku: string

  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNumber()
  quantity: number

  @ApiProperty()
  @IsNumber()
  unitPrice: number

  @ApiProperty()
  @IsNumber()
  totalPrice: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  weight?: any
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  storeId: string

  @ApiProperty()
  @IsString()
  channelOrderId: string

  @ApiProperty()
  @IsString()
  orderNumber: string

  @ApiProperty()
  @IsString()
  customerEmail: string

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress: AddressDto

  @ApiProperty({ type: AddressDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  billingAddress?: AddressDto

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[]

  @ApiProperty()
  @IsNumber()
  subtotal: number

  @ApiProperty()
  @IsNumber()
  shippingCost: number

  @ApiProperty()
  @IsNumber()
  tax: number

  @ApiProperty()
  @IsNumber()
  total: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  metadata?: any
}

export class UpdateOrderDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(['NEW', 'READY_TO_SHIP', 'LABEL_PURCHASED', 'SHIPPED', 'DELIVERED', 'CANCELLED'])
  status?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  metadata?: any
}

export class FulfillOrderDto {
  @ApiProperty()
  @IsString()
  warehouseId: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  shippingService?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  shippingOptions?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  items?: Array<{
    skuId: string
    quantity: number
    binLocationId?: string
  }>
}