import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMgtComponent } from './account-mgt.component';

describe('AccountMgtComponent', () => {
  let component: AccountMgtComponent;
  let fixture: ComponentFixture<AccountMgtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMgtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
