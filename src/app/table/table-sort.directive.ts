import { Directive, Component, Optional, HostListener, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Sort, SortDirection } from './table.component';
import { Subscription } from 'rxjs';

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
    if (this.active != sortable.id)
    {
      this.active = sortable.id;
      this.direction = 'asc';
    }
    else {
      const sortOrder: SortDirection[] = [ 'asc', 'desc', '']
      let index = sortOrder.indexOf(this.direction);
      let newIndex = (index + 1) % 3;
      this.direction = sortOrder[newIndex];
    }
    

    this.sortChange.emit({field: sortable.id, direction: this.direction});
  }
}


@Component({
  selector: '[tableSortHeader]',
  templateUrl: './table-sort-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSortHeader  implements TableSortable{
  @Input('tableSortHeader') id: string;

  private _renderSubscription : Subscription;

  constructor(ref: ChangeDetectorRef, @Optional() public _sort: TableSort) { 
    this._renderSubscription = _sort.sortChange
      .subscribe(() =>
      {
        ref.markForCheck();
      });
  }

  @HostListener('click') 
  handleClick() {
    this._sort.sort(this);
  }

  _isSorted(): boolean {
    return this._sort.active == this.id 
      && (this._sort.direction ==='asc' || this._sort.direction === 'desc');
  }

  _getDirection() {
    return this._isSorted() ? this._sort.direction : ''; 
  }
}
