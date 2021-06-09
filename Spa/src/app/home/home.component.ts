import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any = null;
  error: any = null;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  get isAuthenticated$(){
    return this.oidcSecurityService.isAuthenticated$;
  }

  get userData$(){
    return this.oidcSecurityService.userData$;
  }

  async callApi(){
    this.data = null;
    this.error = null;

    try {
      let apiUrl = `${environment.baseApiUrl}/weatherforecast`;
      let accessToken = this.oidcSecurityService.getToken();
      let headers = {};
      if(accessToken)
        headers['authorization'] = `Bearer ${accessToken}`;
      this.data = await this.httpClient
        .get(apiUrl, {
          headers: headers
        })
        .pipe(take(1))
        .toPromise();
        
    } catch (error) {
      this.error = error;
    }
  }

}
