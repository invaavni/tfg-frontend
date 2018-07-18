import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PredictionService {

    API_URL = 'http://localhost:5000/api/v1.0';

    constructor(private http: HttpClient) { }

    public getCurrencies() {
        return this.http.get(this.API_URL + '/currencies');
    }

    public testPredict(currencySymbol: string) {
        let params = new HttpParams().set('currency', currencySymbol);
        return this.http.get(this.API_URL + '/predict/test', {params: params});
    }

    public predict(currencySymbol: string, dateString: string) {
        let params = new HttpParams();
        params = params.set('currency', currencySymbol);
        params = params.set('finalDate', dateString);
        return this.http.get(this.API_URL + '/predict', {params: params});
    }

}