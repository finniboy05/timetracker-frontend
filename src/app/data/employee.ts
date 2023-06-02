import {Department} from './department';

export class Employee {
  public id!: number;
  public name = '';
  public firstname = '';
  public department = new Department();
  public departmentId = 0;
}
