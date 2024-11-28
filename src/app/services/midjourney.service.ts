import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class MidjourneyService {
  private apiUrl =
    'https://midjourney-imaginecraft-generative-ai-api.p.rapidapi.com/midjourney/imagine';

  constructor(private http: HttpClient) {}

  generateImage(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': environment.XRapidapiKey,
      'x-rapidapi-host':
        'midjourney-imaginecraft-generative-ai-api.p.rapidapi.com',
      'Content-Type': 'application/json',
    });

    const body = {
      Prompt: prompt,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }

  getImage(taskId: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': environment.XRapidapiKey,
      'x-rapidapi-host':
        'midjourney-imaginecraft-generative-ai-api.p.rapidapi.com',
      'Content-Type': 'application/json',
    });
    const url =
      'https://midjourney-imaginecraft-generative-ai-api.p.rapidapi.com/midjourney/getresult';

    return this.http.post(url, { taskId }, { headers });
  }
}
