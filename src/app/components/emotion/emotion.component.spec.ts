import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmotionComponent } from './emotion.component';

describe('EmotionComponent', () => {
  let component: EmotionComponent;
  let fixture: ComponentFixture<EmotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
