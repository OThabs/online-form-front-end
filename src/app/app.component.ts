import { Component, OnInit } from '@angular/core';
import { Person } from './models';
import { DataService } from './services/data.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forms';
  persons: Person[] = [];
  person: Person;
  captureForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private spinnerService: NgxSpinnerService) {
    this.captureForm = this.formBuilder.group({
      id: '',
      fullName: '',
      idNumber: ''
    });

  }

  ngOnInit() {
    this.dataService.getUsers()
      .subscribe(data => this.persons = data);
  }

  onSubmit() {
    let body = {
      id: this.captureForm.controls['idNumber'].value,
      fullName: this.captureForm.controls['fullName'].value,
      idNumber: this.captureForm.controls['idNumber'].value
    };
    this.spinnerService.show();
    this.dataService.createUsers(body).subscribe((data: any) => {
      this.persons = data;
      this.ngOnInit();
    });
    this.spinnerService.hide();
  }
}

