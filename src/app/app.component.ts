import {Component, OnInit} from '@angular/core';
import {Person} from './models';
import {DataService} from './services/data.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forms';
  persons$: Person[];
  person: Person;
  captureForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService) {

  }

  ngOnInit() {
    this.dataService.getUsers()
      .subscribe(data => this.persons$ = data);
  }

  onSubmit() {
    let body = {
      id: this.captureForm.value.idNumber,
      fullName: this.captureForm.value.fullName,
      idNumber: this.captureForm.value.idNumber
    };
    this.dataService.createUsers(body).subscribe((data: any) => {
      //your will get data success or false
      this.persons$ = data;

    });
  }
}

