import { Directive, Component, Optional, HostListener, Input } from '@angular/core';

export interface TableSortable {
  id: string;
}

@Directive({
  selector: '[tableSort]'
})
export class TableSort {

  constructor() { }

  sort(sortable: TableSortable) {

  }

  log() {
    console.log('im alive');
  }
}


@Directive({
  selector: '[tableSortHeader]'
})
export class TableSortHeader  implements TableSortable{
  @Input('table-sort-header') id: string;

  constructor(@Optional() public _sort: TableSort) {
    _sort.log();
  }

  @HostListener('click') handleClick() {
    
  }
}
