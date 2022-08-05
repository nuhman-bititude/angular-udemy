import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataStorageService) {}

  ngOnInit(): void {}
  onSaveData() {
    this.dataService.saveRecipes;
  }
  onFetchData() {
    this.dataService.fetchRecipes();
  }
}
