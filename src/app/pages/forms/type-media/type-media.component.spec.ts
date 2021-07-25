import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMediaComponent } from './type-media.component';

describe('TypeMediaComponent', () => {
  let component: TypeMediaComponent;
  let fixture: ComponentFixture<TypeMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
