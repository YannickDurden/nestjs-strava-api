import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
    private idStrava: string;
    private tokenStrava: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
    ) {
        this.idStrava = this.config.get('API_STRAVA_ATHLETE_ID');
        this.tokenStrava = this.config.get('API_STRAVA_TOKEN');
    }

    /**
     * @param url string
     */
    async baseGetMethod(url: string) {
        const authStrava: object = {
            headers: {
                Authorization: this.tokenStrava,
            },
        };

        return await this.httpService
            .get(url, authStrava)
            .toPromise();
    }

    /**
     * Fetch athlete stats
     */
    async fetchAthleteStats() {
        const url = 'https://www.strava.com/api/v3/athlete/activities';
        return await this.baseGetMethod(url)
        .then(response => {
            return response.data;
        });
    }

    /**
     * Fetch athlete infos by ids
     */
    async fetchAthleteInfos() {
        const url: string = `https://www.strava.com/api/v3/athletes/${this.idStrava}`;
        return await this.baseGetMethod(url)
        .then(response => {
            return response.data;
        });
    }

    /**
     * Fetch last activities
     */
    async fetchAthleteLastActivity() {
        /**
         * The parameters could be:
         *  before: integer (timestamp)
         *  after: integer (timestamp)
         *  page: integer
         *  per_page: integer (defaults to 30)
         */
        const perPage = '?per_page=5';
        const url: string = 'https://www.strava.com/api/v3/athlete/activities' + perPage;
        return await this.baseGetMethod(url)
        .then(response => {
            return response.data;
        });
    }

    /**
     * Fetch activity by id
     * TODO : fetch activity with only one request
     */
    async fetchAthleteActivityById(activityId: number) {
        const url = `https://www.strava.com/api/v3/activities/${activityId}`;

        return await this.baseGetMethod(url)
        .then(response => {
            return response.data;
        });
    }
}
