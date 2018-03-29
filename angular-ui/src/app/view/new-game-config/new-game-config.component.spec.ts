import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGameConfigComponent } from './new-game-config.component';

describe('NewGameConfigComponent', () => {
  let component: NewGameConfigComponent;
  let fixture: ComponentFixture<NewGameConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGameConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGameConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
