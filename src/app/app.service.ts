import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private searchHistory: any[] = [];

  set setHistry(userData: any) {
    this.searchHistory.push(userData);
  }

  get getHistory(): any {
    return this.searchHistory;
  }

  clearAllHistory(): void {
    this.searchHistory.length = 0;
  }

  deleteHistory = (timestamp: number): void => {
    const index = this.searchHistory.findIndex(d => d.timestamp === timestamp);
    this.searchHistory.splice(index, 1);
  }

  constructor(private _http: HttpClient) { }

  getUser = (username: string): Observable<any> => {
    return this._http.get(`${environment.API}/${username}`);
  }

}
