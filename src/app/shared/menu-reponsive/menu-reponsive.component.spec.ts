import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuReponsiveComponent } from './menu-reponsive.component';

describe('MenuReponsiveComponent', () => {
  let component: MenuReponsiveComponent;
  let fixture: ComponentFixture<MenuReponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuReponsiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuReponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
