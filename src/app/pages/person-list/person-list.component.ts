import { Component } from '@angular/core';
import { Person } from 'src/app/data/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent {

  personList: Person[] = [];

  constructor(private personService: PersonService) {
    this.personService.getList().subscribe(obj => {
      this.personList = obj;
    });
  }
}
