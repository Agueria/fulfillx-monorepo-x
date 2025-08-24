import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RulesService } from './rules.service'
import { CreateRuleDto, UpdateRuleDto } from './dto/rules.dto'

@ApiTags('rules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all automation rules' })
  @ApiResponse({ status: 200, description: 'Rules retrieved successfully' })
  getRules(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('active') active?: boolean,
  ) {
    return this.rulesService.getRules({ page, limit, active })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rule by ID' })
  @ApiResponse({ status: 200, description: 'Rule retrieved successfully' })
  getRule(@Param('id') id: string) {
    return this.rulesService.getRule(id)
  }

  @Post()
  @ApiOperation({ summary: 'Create new automation rule' })
  @ApiResponse({ status: 201, description: 'Rule created successfully' })
  createRule(@Body() createRuleDto: CreateRuleDto) {
    return this.rulesService.createRule(createRuleDto)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update automation rule' })
  @ApiResponse({ status: 200, description: 'Rule updated successfully' })
  updateRule(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return this.rulesService.updateRule(id, updateRuleDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete automation rule' })
  @ApiResponse({ status: 200, description: 'Rule deleted successfully' })
  deleteRule(@Param('id') id: string) {
    return this.rulesService.deleteRule(id)
  }

  @Post(':id/toggle')
  @ApiOperation({ summary: 'Toggle rule active status' })
  @ApiResponse({ status: 200, description: 'Rule status toggled successfully' })
  toggleRule(@Param('id') id: string) {
    return this.rulesService.toggleRule(id)
  }

  @Post('test')
  @ApiOperation({ summary: 'Test rule conditions against sample data' })
  @ApiResponse({ status: 200, description: 'Rule test completed successfully' })
  testRule(@Body() testData: { rule: any; sampleOrder: any }) {
    return this.rulesService.testRule(testData.rule, testData.sampleOrder)
  }

  @Get(':id/executions')
  @ApiOperation({ summary: 'Get rule execution history' })
  @ApiResponse({ status: 200, description: 'Rule executions retrieved successfully' })
  getRuleExecutions(
    @Param('id') id: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.rulesService.getRuleExecutions(id, { page, limit })
  }
}