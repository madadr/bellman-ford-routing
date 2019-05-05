import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHistoryBrowserComponent } from './update-history-browser.component';

describe('UpdateHistoryBrowserComponent', () => {
  let component: UpdateHistoryBrowserComponent;
  let fixture: ComponentFixture<UpdateHistoryBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHistoryBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHistoryBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
