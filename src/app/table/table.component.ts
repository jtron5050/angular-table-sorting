import { Component, OnInit, Directive, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { DataSource } from "@angular/cdk/table";
import { map } from "rxjs/operators";
import { TableSort } from './table-sort.directive';

export interface ClientData {
  id: number;
  name: string;
}
 
const exampleData = [
  {id: 1, name: 'josh'},
  {id: 2, name: 'yuka'},
  {id: 3, name: 'yuka2'},
  {id: 4, name: 'yuka3'},
  {id: 5, name: 'yuka4'},
  {id: 6, name: 'yuka5'},
  {id: 7, name: 'yuka6'},
  {id: 8, name: 'yuka7'},
  {id: 9, name: 'yuka8'},
  {id: 10, name: 'yuka9'},
  {id: 11, name: 'yuka10'},
];

export type SortDirection = 'asc' | 'desc' | '';

export interface Sort {
  field: string,
  direction: SortDirection
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: ClientDataSource;

  @ViewChild(TableSort) sort: TableSort;

  constructor() {   
  }
  
  ngOnInit() {
    this.dataSource = new ClientDataSource(exampleData, this.sort);
  }
}



export class ClientDataSource  extends DataSource<ClientData> {
  dataChange: BehaviorSubject<ClientData[]> = new BehaviorSubject<ClientData[]>([]);

  constructor(data: ClientData[], private _sort: TableSort) {
    super();
    this.dataChange.next(data);
  }

  connect(): Observable<ClientData[]> {
    const changes = [
      this.dataChange,
      this._sort.sortChange
    ];

    return merge(...changes).pipe(map(() => this.getSortedData()));
  }  
  
  disconnect() {
  }
  
  private getSortedData(): ClientData[] {
    const data = [...exampleData];
    const active = this._sort.active;
    if (this._sort.direction === '')
      return data;

    return data.sort((a: ClientData, b: ClientData) => {
      return (a[active] < b[active] ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}