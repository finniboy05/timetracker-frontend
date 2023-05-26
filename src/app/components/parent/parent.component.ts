import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";
import {DataElement} from "../../data/data-element";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  dataElements: DataElement[] = [];
  private subElements?: Subscription;

  constructor(private dataService: DataService) {
  }

  async ngOnInit() {
    this.subElements = this.dataService.dataElementsObservable.subscribe(dataElements => {
      this.dataElements = dataElements;
    });
  }

  addRandomElement() {
    this.dataService.addRandomElement();
  }
}
