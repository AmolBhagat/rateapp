import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

    private http: Http = null;
    private baseUrl = 'http://107.170.218.205:4250/';
    private ratingListUrl = this.baseUrl + 'rates';
    private graphDataUrl = this.baseUrl + 'graphs';
    constructor(@Inject(Http) http: Http) {
        this.http = http;
    }

    getRatingList(): Observable<any> {
        return this.http.get(this.ratingListUrl);
    }
    getGraphData(){
        return this.http.get(this.graphDataUrl);
    }
    /*save(data): Observable<any> {
        return this.http.post(this.ratingListUrl,data);
    }*/

    createReview(review){
     
        return this.http.post(this.ratingListUrl,review);
    }
}
