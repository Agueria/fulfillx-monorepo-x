import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { RegisterDto, LoginDto } from './dto/auth.dto'

// Mock user store - replace with actual database
const users = new Map()
const refreshTokens = new Set()

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = users.get(email)
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, orgId: user.orgId }
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '30d' })
    
    refreshTokens.add(refreshToken)
    
    return {
      user,
      accessToken,
      refreshToken,
      organizations: user.organizations || []
    }
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name, organizationName } = registerDto
    
    if (users.has(email)) {
      throw new ConflictException('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = `user_${Date.now()}`
    const orgId = `org_${Date.now()}`
    
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      name,
      orgId,
      organizations: [{
        id: orgId,
        name: organizationName || `${name}'s Organization`,
        role: 'ADMIN'
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    users.set(email, user)
    
    return this.login(user)
  }

  async refreshToken(refreshToken: string) {
    if (!refreshTokens.has(refreshToken)) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    try {
      const payload = this.jwtService.verify(refreshToken)
      const newAccessToken = this.jwtService.sign({
        email: payload.email,
        sub: payload.sub,
        orgId: payload.orgId
      })
      
      const newRefreshToken = this.jwtService.sign({
        email: payload.email,
        sub: payload.sub,
        orgId: payload.orgId
      }, { expiresIn: '30d' })
      
      refreshTokens.delete(refreshToken)
      refreshTokens.add(newRefreshToken)
      
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  async refresh(refreshToken: string) {
    return this.refreshToken(refreshToken)
  }

  async getProfile(userId: string) {
    // Find user by ID
    for (const [email, user] of users.entries()) {
      if (user.id === userId) {
        const { password, ...profile } = user
        return profile
      }
    }
    throw new UnauthorizedException('User not found')
  }

  async logout(userId: string) {
    // In a real implementation, you would invalidate the refresh token
    return { message: 'Logged out successfully' }
  }
}