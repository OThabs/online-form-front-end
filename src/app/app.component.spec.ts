import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataService } from './services/data.service';

describe('AppComponent', () => {

  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        MatExpansionModule,
        HttpClientModule,
        ReactiveFormsModule],
      providers: [DataService, { provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'forms'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('forms');
  });

  it(`should call onSubmit method`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    let component: AppComponent = fixture.componentInstance;
    component.captureForm = formBuilder.group({
      fullName: 'firstName',
      idNumber: '1234567890',
      id: '1234567890'
    });
    fixture.detectChanges();
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });


});
