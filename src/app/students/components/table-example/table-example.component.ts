import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { UserInterface } from 'src/app/models/user.model';

const ELEMENT_DATA: UserInterface[] = [
  { firstName: 'Karolina', lastName: 'Hydrogen', phone: 'H' },
  { firstName: 'Karolina', lastName: 'Helium', phone: 'He' },
  { firstName: 'Karolina', lastName: 'Lithium', phone: 'Li' },
  { firstName: 'Karolina', lastName: 'Beryllium', phone: 'Be' },
  { firstName: 'Karolina', lastName: 'Boron', phone: 'B' },
  { firstName: 'Karolina', lastName: 'Carbon', phone: 'C' },
  { firstName: 'Karolina', lastName: 'Nitrogen', phone: 'N' },
  { firstName: 'Karolina', lastName: 'Oxygen', phone: 'O' },
  { firstName: 'Karolina', lastName: 'Fluorine', phone: 'F' },
];
/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss'],
})
export class TableExampleComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'phone'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;
  @Input() list!: Observable<UserInterface[]>;

  ngOnInit() {
    this.list.subscribe({
      next: (list) => {
        let flatTab = list.map((tab) => ({
          firstName: tab.firstName,
          lastName: tab.lastName,
          phone: tab.phone,
        })) as UserInterface[];
        this.dataSource = new MatTableDataSource(flatTab as any[]);
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange($event: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if ($event.direction) {
      this._liveAnnouncer.announce(`Sorted ${$event.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
