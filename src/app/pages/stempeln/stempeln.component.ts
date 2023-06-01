import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { Component } from '@angular/core';
import { StempelService } from 'src/app/services/stempel.service';

@Component({
  selector: 'app-stempeln',
  templateUrl: './stempeln.component.html',
  styleUrls: ['./stempeln.component.scss'],
})
export class StempelnComponent {
  constructor(
    private stempelService: StempelService
  ) {}

  getAllStempel() {
    return this.stempelService.getList();
  }
}
