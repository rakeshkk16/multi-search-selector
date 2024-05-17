import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSearchSelectorComponent } from './multi-search-selector.component';

describe('MultiSearchSelectorComponent', () => {
  let component: MultiSearchSelectorComponent;
  let fixture: ComponentFixture<MultiSearchSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSearchSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiSearchSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
