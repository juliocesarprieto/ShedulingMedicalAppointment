import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from '../models';
import { LocalUser } from '../models/local-user';
import { StorageService } from './storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataSharedService } from '../shared/data-shared.service';

@Injectable()
export class AuthService {
    apiUrl = 'http://localhost:8080/login';

    jwtHelper = new JwtHelperService();

    constructor(
        private http: HttpClient,
        public storageService: StorageService,
        private dataSharedService: DataSharedService) {}

    login(credential: Credentials ) {
        return this.http.post(
            `${this.apiUrl}`,
             credential,
             {
                observe: 'response',
                responseType: 'text'
            });
    }

    successfulLogin(authorizationValue: string) {
        const tok = authorizationValue.substring(7);
        const user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };

        this.storageService.setLocalUser(user);
        this.dataSharedService.isUserLoggedIn.next(true);
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('localUser');
        if (token !== null) {
            return !this.jwtHelper.isTokenExpired(JSON.parse(token).token);
        }
        return false;
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}
