import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWindowComponent } from './search-window.component';

describe('SearchWindowComponent', () => {
  let component: SearchWindowComponent;
  let fixture: ComponentFixture<SearchWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWindowComponent]
    });
    fixture = TestBed.createComponent(SearchWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
