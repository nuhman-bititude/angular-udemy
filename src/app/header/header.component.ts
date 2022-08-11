import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubcription: Subscription;
  constructor(
    private dataService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubcription = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
  }
  onSaveData() {
    this.dataService.saveRecipes();
  }
  onFetchData() {
    this.dataService.fetchRecipes().subscribe((responce) => {});
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubcription.unsubscribe();
  }
}
