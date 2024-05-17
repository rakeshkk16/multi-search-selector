import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSearchSelectorService } from '../service/multi-search-selector.service';


@Component({
  selector: 'multi-search-selector',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  template: `
    <div [class.active]="isToggled">
      <!-- External input box displaying selected items -->
      <input type="text" class="multi-search"  (click)="toggle()" placeholder="Selected items..." [value]="selectedItems" readonly/>
      
      <!-- Dropdown with search functionality -->
      <div class="dropdown">
        <input type="text" class="input-search" placeholder="Search..." [(ngModel)]="searchText" (ngModelChange)="onSearchChange()"/>
        <div *ngIf="isGroupedData; else ungroupedTemplate">
          <div *ngFor="let group of filteredData">
            <h3>{{ group.group }}</h3>
            <ul>
              <li *ngFor="let item of group.children">
                <label>
                  <input type="checkbox" [checked]="item.selected" (change)="toggleSelection(item)">
                  {{ item.item_text }}
                </label>
              </li>
            </ul>
          </div>
        </div>
        <ng-template #ungroupedTemplate>
          <ul>
            <li *ngFor="let item of filteredData">
              <label>
                <input type="checkbox" [checked]="item.selected" (change)="toggleSelection(item)">
                {{ item.item_text }}
              </label>
            </li>
          </ul>
        </ng-template>
      </div>
    </div>
  `,
  styleUrl: './multi-search-selector.component.scss',
})
export class MultiSearchSelectorComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() isGroupedData: boolean = false;
  @Output() selectionChange = new EventEmitter<any[]>();
  isValidated: boolean = false
  isToggled = false;

  selectedItems: string = '';

  searchText: string = '';
  filteredData: any[] = [];

  constructor(private multiSearchService: MultiSearchSelectorService) { }

  ngOnInit(): void {
    try {
      this.multiSearchService.validateData(this.data, this.isGroupedData);
      this.isValidated = true;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  ngOnChanges() {
    if(this.isValidated){
      this.filteredData = this.data;
    }
  }

  onSearchChange() {
    // this.filteredData = this.data;
    if (this.searchText) {
      this.filteredData = this.data.map(group => {
        if (this.isGroupedData) {
          return {
            ...group,
            children: group.children.filter((item: any) =>
              item.item_text.toLowerCase().includes(this.searchText.toLowerCase())
            )
          };
        } else {
          return group.item_text.toLowerCase().includes(this.searchText.toLowerCase()) ? group : false;
        }
      }).filter(group => {
        if (this.isGroupedData) {
          return group.children.length > 0;
        } else {
          return group;
        }
      });
    } else {
      this.filteredData = [...this.data];
    }
  }

  toggleSelection(item: any) {
    item.selected = !item.selected;
    const selectedItems = this.isGroupedData ?
      this.data.flatMap(group => group.children) :
      this.data;

    const selectedCount = selectedItems.filter((item: any) => item.selected).length;
    if (selectedCount > 0) {
      if (selectedCount === 1) {
        this.selectedItems = selectedItems.find((item: any) => item.selected).item_text;
      } else {
        this.selectedItems = `${selectedItems.filter((item: any) => item.selected)[selectedCount - 1].item_text} (${selectedCount - 1} ${selectedCount - 1 > 1 ? 'others' : 'other'})`;
      }
    } else {
      this.searchText = '';
    }
    this.filteredData = [...this.data];
    this.searchText = '';
    this.selectionChange.emit(selectedItems.filter((item: any) => item.selected));
  }


  toggle() {
    this.isToggled = !this.isToggled;
  }
}
