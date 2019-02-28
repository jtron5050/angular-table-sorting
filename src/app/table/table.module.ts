import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { CdkTableModule } from '@angular/cdk/table';
import { TableSort, TableSortHeader } from './table-sort.directive';

@NgModule({
  declarations: [
    TableComponent,
    TableSort,
    TableSortHeader
  ],
  imports: [
    CommonModule,
    CdkTableModule
  ],
  exports: [
    TableComponent,
    TableSort,
    TableSortHeader
  ]
})
export class TableModule { }
