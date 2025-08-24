import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsObject, IsOptional, IsBoolean, IsArray } from 'class-validator'

export class CreateRuleDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @IsObject()
  conditions: any

  @ApiProperty()
  @IsArray()
  actions: any[]

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  priority?: number

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}

export class UpdateRuleDto {
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
  conditions?: any

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  actions?: any[]

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  priority?: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}