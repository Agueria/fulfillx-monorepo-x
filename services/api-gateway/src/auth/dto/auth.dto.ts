import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'demo@fulfillx.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string
}

export class RegisterDto {
  @ApiProperty({ example: 'demo@fulfillx.com' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string

  @ApiProperty({ example: 'My Company', required: false })
  @IsOptional()
  @IsString()
  organizationName?: string
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  currentPassword: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  newPassword: string
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string
}

export class ResetPasswordConfirmDto {
  @ApiProperty()
  @IsString()
  token: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  newPassword: string
}