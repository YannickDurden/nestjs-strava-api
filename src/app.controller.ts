import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    /**
     * @returns athletes statisiques
     */
    @Get('/strava/stats')
    getAthleteStats() {
        return this.appService.fetchAthleteStats();
    }

    /**
     * @returns athlete informations
     */
    @Get('/strava/infos')
    getAthleteInfos() {
        return this.appService.fetchAthleteInfos();
    }

    /**
     * @returns athlete activities
     */
    @Get('/strava/activities')
    getAthleteActivities() {
        return this.appService.fetchAthleteActivities();
    }
}
