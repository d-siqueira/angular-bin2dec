import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConverterService } from './services/converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  decimalValue!: number;

  constructor(fb: FormBuilder, private service: ConverterService) {
    this.form = fb.group({
      inputBinary: ['', [Validators.required, Validators.pattern(/^[0-1]+$/)]]
    });
  }

  convertToDecimal(): void {
    if(this.form.invalid) return;
    const {inputBinary} = this.form.value;

    this.decimalValue = this.service.convertBinaryToDecimal(inputBinary);
  }
}
