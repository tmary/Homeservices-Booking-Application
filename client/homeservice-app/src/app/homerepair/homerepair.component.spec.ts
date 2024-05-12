import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerepairComponent } from './homerepair.component';

describe('HomerepairComponent', () => {
  let component: HomerepairComponent;
  let fixture: ComponentFixture<HomerepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomerepairComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomerepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
