import { Component } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerService } from './services/datepicker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: DatepickerService}
  ]
})

export class AppComponent{}
