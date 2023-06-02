import { Employee } from "./employee";
import { Project } from "./project";

export class Stempel {
  public id!: number;
  public time = '';
  public employee = new Employee();
  public employeeId = 0;
  public project = new Project();
  public projectId = 0;
}
