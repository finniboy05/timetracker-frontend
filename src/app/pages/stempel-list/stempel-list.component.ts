import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { Stempel } from 'src/app/data/stempel';
import { StempelService } from 'src/app/services/stempel.service';

@Component({
  selector: 'app-stempel-list',
  templateUrl: './stempel-list.component.html',
  styleUrls: ['./stempel-list.component.scss']
})
export class StempelListComponent implements OnInit {
  stempelDataSource = new MatTableDataSource<Stempel>();
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  columns = ['id', 'time', 'employeeId', 'projectId', 'actions'];

  public constructor(
    private stempelService: StempelService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.reloadData();
  }

  reloadData() {
    this.stempelService.getList().subscribe((obj) => {
      this.stempelDataSource.data = obj;
    });
  }

  async edit(stempel: Stempel) {
    await this.router.navigate(['stempel', stempel.id]);
  }

  async add() {
    await this.router.navigate(['stempel']);
  }

  delete(stempel: Stempel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '450px',
      data: {
        title: 'Delete Person?',
        message: 'Do you really want to delete the selected person?',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.stempelService.delete(stempel.id).subscribe({
          next: (response) => {
            if (response.status === 200) {
              this.snackBar.open('Person deleted!"', 'Close', {
                duration: 5000,
              });
              this.reloadData();
            } else {
              this.snackBar.open(
                'Item could not be deleted, server error!',
                'Close',
                { duration: 5000 }
              );
            }
          },
          error: () =>
            this.snackBar.open(
              'Item could not be deleted, server error!',
              'Close',
              { duration: 5000 }
            ),
        });
      }
    });
  }
}
