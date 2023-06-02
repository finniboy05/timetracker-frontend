import { AppAuthService } from './services/app.auth.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MenuService} from "./services/menu.service";
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentPage = '';
  private subPage?: Subscription;

  constructor(private authService: AppAuthService, private menuService: MenuService, public oAuthService: OAuthService) {
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.subPage = this.menuService.pageObservable.subscribe(page => {
      this.currentPage = page;
    });
  }

  ngOnDestroy(): void {
    this.subPage?.unsubscribe();
  }

  async navigateTo(page: string) {
    await this.menuService.setPage(page);
  }
}
