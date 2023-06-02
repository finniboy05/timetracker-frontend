import {Component, Input} from '@angular/core';
import {DataElement} from "../../data/data-element";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  @Input()
  dataElement!: DataElement;

  constructor(private dataService: DataService) {}

  delete() {
    this.dataService.deleteElement(this.dataElement.id);
  }

}
