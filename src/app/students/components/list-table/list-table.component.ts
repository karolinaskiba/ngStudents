import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserInterface } from 'src/app/models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { SnackBarService } from 'src/app/services/snackBar/snackBar.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent implements OnInit {
  @Input() list: Observable<UserInterface[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Output() details: EventEmitter<string>;

  dataSource!: MatTableDataSource<UserInterface[]>;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'phone',
    'actionsSelect',
  ];

  constructor(private snackBar: SnackBarService) {
    this.details = new EventEmitter<string>();
  }

  ngOnInit() {
    this.list
      .pipe(
        map((list) =>
          list.map((item) => {
            return {
              firstName: item.firstName,
              lastName: item.lastName,
              phone: item.phone,
              id: item.id,
            } as UserInterface;
          })
        )
      )
      .subscribe({
        next: (list: UserInterface[]) => {
          this.dataSource = new MatTableDataSource(list as any);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) =>
          this.snackBar.openSnackBar(err.message + 'update error'),
      });
  }

  onDetails(id: string) {
    this.details.emit(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
