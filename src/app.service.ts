import { Injectable, HttpService, HttpException } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
    private idStrava: string;
    private tokenStrava: string;
    
    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService
    ) {
        this.idStrava = this.config.get('API_STRAVA_ATHLETE_ID');
        this.tokenStrava = this.config.get('API_STRAVA_TOKEN');
    }
    
    async baseGetMethod(url: string) {
        const authStrava: object = {
            headers: {
                'Authorization': this.tokenStrava
            }
        };

        return await this.httpService
            .get(url, authStrava)
            .toPromise()
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new HttpException(error.message, error.status);
            })
            ;
    }
    /**
     * Fetch athlete stats
     */
    fetchAthleteStats() {
        const url = 'https://www.strava.com/api/v3/athlete/activities';
        return this.baseGetMethod(url);
    }

    /**
     * Fetch athlete infos by ids
     */
    fetchAthleteInfos() {
        const url: string = `https://www.strava.com/api/v3/athletes/${this.idStrava}`;
        return this.baseGetMethod(url);
    }

    /**
     * Fetch last activities
     */
    fetchAthleteActivities() {
        /**
         * The parameters could be:
         *  before: integer (timestamp)
         *  after: integer (timestamp)
         *  page: integer
         *  per_page: integer (defaults to 30)
         */
        const perPage = '?per_page=5';
        const url: string = 'https://www.strava.com/api/v3/athlete/activities' + perPage;
        return this.baseGetMethod(url);
    }
}
