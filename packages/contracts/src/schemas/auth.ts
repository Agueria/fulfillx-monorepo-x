import { z } from 'zod'

export const RoleSchema = z.enum([
  'ADMIN',
  'OPS_MANAGER', 
  'PICKER',
  'FINANCE',
  'ANALYST',
  'VIEWER'
])

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  avatar: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  settings: z.record(z.any()).default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const OrganizationMemberSchema = z.object({
  id: z.string(),
  userId: z.string(),
  orgId: z.string(),
  role: RoleSchema,
  user: UserSchema.optional(),
  org: OrganizationSchema.optional(),
})

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  organizationName: z.string().min(1).optional(),
})

export const LoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  organizations: z.array(OrganizationMemberSchema),
})

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
})

export const RefreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

export const ChangePasswordRequestSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6),
})

export const ResetPasswordRequestSchema = z.object({
  email: z.string().email(),
})

export const ResetPasswordConfirmSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(6),
})

export const UpdateProfileRequestSchema = z.object({
  name: z.string().min(1).optional(),
  avatar: z.string().url().optional(),
})

export const InviteUserRequestSchema = z.object({
  email: z.string().email(),
  role: RoleSchema,
  message: z.string().optional(),
})

export const AcceptInviteRequestSchema = z.object({
  token: z.string(),
  name: z.string().min(1),
  password: z.string().min(6),
})

export const UpdateMemberRoleRequestSchema = z.object({
  memberId: z.string(),
  role: RoleSchema,
})

export const CreateOrganizationRequestSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
})

export const UpdateOrganizationRequestSchema = z.object({
  name: z.string().min(1).optional(),
  settings: z.record(z.any()).optional(),
})

export const PermissionSchema = z.enum([
  'orders.create',
  'orders.read',
  'orders.update',
  'orders.delete',
  'inventory.create',
  'inventory.read',
  'inventory.update',
  'inventory.delete',
  'inventory.adjust',
  'shipping.create',
  'shipping.read',
  'labels.purchase',
  'labels.void',
  'analytics.read',
  'analytics.export',
  'rules.create',
  'rules.read',
  'rules.update',
  'rules.delete',
  'rules.manage',
  'users.invite',
  'users.manage',
  'org.manage',
  'settings.manage'
])

export const RolePermissionsSchema = z.object({
  role: RoleSchema,
  permissions: z.array(PermissionSchema),
})

// Default role permissions
export const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [
    'orders.create', 'orders.read', 'orders.update', 'orders.delete',
    'inventory.create', 'inventory.read', 'inventory.update', 'inventory.delete', 'inventory.adjust',
    'shipping.create', 'shipping.read', 'labels.purchase', 'labels.void',
    'analytics.read', 'analytics.export',
    'rules.create', 'rules.read', 'rules.update', 'rules.delete', 'rules.manage',
    'users.invite', 'users.manage', 'org.manage', 'settings.manage'
  ],
  OPS_MANAGER: [
    'orders.create', 'orders.read', 'orders.update',
    'inventory.read', 'inventory.update', 'inventory.adjust',
    'shipping.create', 'shipping.read', 'labels.purchase', 'labels.void',
    'analytics.read', 'rules.read', 'rules.update'
  ],
  PICKER: [
    'orders.read', 'orders.update',
    'inventory.read', 'shipping.read'
  ],
  FINANCE: [
    'orders.read', 'analytics.read', 'analytics.export'
  ],
  ANALYST: [
    'orders.read', 'inventory.read', 'analytics.read', 'analytics.export'
  ],
  VIEWER: [
    'orders.read', 'inventory.read', 'shipping.read', 'analytics.read'
  ]
}

export type Role = z.infer<typeof RoleSchema>
export type User = z.infer<typeof UserSchema>
export type Organization = z.infer<typeof OrganizationSchema>
export type OrganizationMember = z.infer<typeof OrganizationMemberSchema>
export type LoginRequest = z.infer<typeof LoginRequestSchema>
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>
export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>
export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>
export type ResetPasswordConfirm = z.infer<typeof ResetPasswordConfirmSchema>
export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>
export type InviteUserRequest = z.infer<typeof InviteUserRequestSchema>
export type AcceptInviteRequest = z.infer<typeof AcceptInviteRequestSchema>
export type UpdateMemberRoleRequest = z.infer<typeof UpdateMemberRoleRequestSchema>
export type CreateOrganizationRequest = z.infer<typeof CreateOrganizationRequestSchema>
export type UpdateOrganizationRequest = z.infer<typeof UpdateOrganizationRequestSchema>
export type Permission = z.infer<typeof PermissionSchema>
export type RolePermissions = z.infer<typeof RolePermissionsSchema>