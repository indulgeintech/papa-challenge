import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateVisit } from './dtos/create-visit.dto';
import { FufillVisitDto } from './dtos/fufill-visit.dto';
import { VisitDto } from './dtos/visit.dto';
import { VisitsService } from './visits.service';

@Controller('visits')
@ApiTags('visits')
export class VisitsController {
    constructor(private readonly visitService: VisitsService) { }

    @Post('')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: VisitDto })
    create(
        @Body() createVisit: CreateVisit,
        @Req() request,
    ): Promise<VisitDto> {
        return this.visitService.createVisit(request.user.id, createVisit);
    }

    @Post('/fufill')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: VisitDto })
    fufill(
        @Body() fufillVisit: FufillVisitDto,
        @Req() request,
    ): Promise<VisitDto> {
        return this.visitService.fufillVisit(request.user.id, fufillVisit);
    }

}
