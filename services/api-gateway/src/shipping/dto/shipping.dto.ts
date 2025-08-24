import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsObject, IsOptional, IsArray, ValidateNested } from 'class-validator'
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

class PackageDto {
  @ApiProperty()
  @IsNumber()
  weight: number

  @ApiProperty()
  @IsString()
  weightUnit: string

  @ApiProperty()
  @IsNumber()
  length: number

  @ApiProperty()
  @IsNumber()
  width: number

  @ApiProperty()
  @IsNumber()
  height: number

  @ApiProperty()
  @IsString()
  dimensionUnit: string
}

export class GetRatesDto {
  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  fromAddress: AddressDto

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  toAddress: AddressDto

  @ApiProperty({ type: [PackageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageDto)
  packages: PackageDto[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  services?: string[]
}

export class PurchaseLabelDto {
  @ApiProperty()
  @IsString()
  rateId: string

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  fromAddress: AddressDto

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  toAddress: AddressDto

  @ApiProperty({ type: PackageDto })
  @ValidateNested()
  @Type(() => PackageDto)
  package: PackageDto

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  options?: any
}

export class VoidLabelDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string
}