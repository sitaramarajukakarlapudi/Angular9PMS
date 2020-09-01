import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignissuesComponent } from './assignissues.component';

describe('AssignissuesComponent', () => {
  let component: AssignissuesComponent;
  let fixture: ComponentFixture<AssignissuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignissuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
