import { Directive, Component, Optional, HostListener, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Sort, SortDirection } from './table.component';

export interface TableSortable {
  id: string;
}

@Directive({
  selector: '[tableSort]'
})
export class TableSort {
  @Output('sortChange') readonly sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  active: string;
  direction: SortDirection;

  constructor() { }

  sort(sortable: TableSortable) {
    console.log('begin sort');
    console.log('id = ' + sortable.id);
    this.active = sortable.id;
    this.direction = this.direction === 'asc' ? 'desc': 'asc';

    this.sortChange.emit({field: sortable.id, direction: this.direction});
    console.log('end sort');
  }
}


@Directive({
  selector: '[tableSortHeader]'
})
export class TableSortHeader  implements TableSortable{
  @Input('tableSortHeader') id: string;

  constructor(@Optional() public _sort: TableSort) {
    
  }

  @HostListener('click') handleClick() {
    this._sort.sort(this);
  }
}
