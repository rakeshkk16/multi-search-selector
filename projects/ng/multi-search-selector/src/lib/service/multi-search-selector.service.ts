import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultiSearchSelectorService {

  constructor() { }

  public validateData(data: any, isGroupedData: boolean) {
    if (!Array.isArray(data)) {
      throw new Error("Input data must be an array");
    }
    if(isGroupedData){
      this.validateGroupedData(data);
    } else {
      this.validateArrayData(data);
    }
  }

  public validateGroupedData(data: any){
    data.forEach((group: any, groupIndex: any) => {
      if (typeof group !== 'object' || group === null) {
        throw new Error(`Group at index ${groupIndex} is not an object`);
      }
      if (!group.hasOwnProperty('group') || typeof group.group !== 'string') {
        throw new Error(`Group at index ${groupIndex} is missing 'group' or 'group' is not a string`);
      }
      if (!group.hasOwnProperty('children') || !Array.isArray(group.children)) {
        throw new Error(`Group at index ${groupIndex} is missing 'children' or 'children' is not an array`);
      }

      group.children.forEach((item: any, itemIndex: any) => {
        if (typeof item !== 'object' || item === null) {
          throw new Error(`Item at index ${itemIndex} in group ${groupIndex} is not an object`);
        }
        if (!item.hasOwnProperty('item_id') || typeof item.item_id !== 'number') {
          throw new Error(`Item at index ${itemIndex} in group ${groupIndex} is missing 'item_id' or 'item_id' is not a number`);
        }
        if (!item.hasOwnProperty('item_text') || typeof item.item_text !== 'string') {
          throw new Error(`Item at index ${itemIndex} in group ${groupIndex} is missing 'item_text' or 'item_text' is not a string`);
        }
      });
    });
  } 

  public validateArrayData(data: any){
    data.forEach((item: any, index: any) => {
      if (typeof item !== 'object' || item === null) {
        throw new Error(`Item at index ${index} is not an object`);
      }
      if (!item.hasOwnProperty('item_id') || typeof item.item_id !== 'number') {
        throw new Error(`Item at index ${index} is missing 'item_id' or 'item_id' is not a number`);
      }
      if (!item.hasOwnProperty('item_text') || typeof item.item_text !== 'string') {
        throw new Error(`Item at index ${index} is missing 'item_text' or 'item_text' is not a string`);
      }
    });
  }
}
