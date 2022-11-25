import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('#convertToDecimal() should set #decimalValue', () => {
    component.form.get('inputBinary')?.setValue('11010');

    component.convertToDecimal();

    expect(component.decimalValue).toEqual(26);
  });

  it('#form should be invalid when set invalid value', () => {
    const invalidValues = ['', 'a11', '1a1', '11a', '23', 'a', undefined, null];

    invalidValues.forEach(invalidValue => {
      component.form.get('inputBinary')?.setValue(invalidValue);

      expect(component.form.invalid).withContext(`value: ${invalidValue}`).toBeTrue();
    });
  });

  it('(D)should display value when set decimalValue ', () => {
    component.decimalValue = 26;
    fixture.detectChanges();
    const hostElement: HTMLElement = fixture.nativeElement;
    const resultElement: HTMLParagraphElement = hostElement.querySelector('.result p')!;

    const result = resultElement.textContent?.trim();

    expect(result).toBe('26');
  });

  it('(D)should not display result when decimalValue is undefined ', () => {
    fixture.detectChanges();
    const hostElement: HTMLElement = fixture.nativeElement;
    const result: HTMLParagraphElement = hostElement.querySelector('.result p')!;

    expect(result).not.toBeTruthy();
  });

  it('(D)should enable button when entering valid value)', () => {
    fixture.detectChanges();
    const hostElement: HTMLElement = fixture.nativeElement;
    const inputBinary: HTMLInputElement = hostElement.querySelector('form [formcontrolname=inputBinary]')!;
    const buttonSubmit: HTMLButtonElement = hostElement.querySelector('form button[type=submit]')!;

    inputBinary.value = '101';
    inputBinary.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(buttonSubmit.disabled).toBeFalse();
  });

  it('(D)should not enable button when entering invalid value)', () => {
    fixture.detectChanges();
    const invalidValues = ['', 'a11', '1a1', '11a', '23', 'a'];
    const hostElement: HTMLElement = fixture.nativeElement;
    const inputBinary: HTMLInputElement = hostElement.querySelector('form [formcontrolname=inputBinary]')!;
    const buttonSubmit: HTMLButtonElement = hostElement.querySelector('form button[type=submit]')!;

    invalidValues.forEach(invalidValue => {
      inputBinary.value = invalidValue;
      inputBinary.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(buttonSubmit.disabled).withContext(`value: ${invalidValue}`).toBeTrue();
    });
  });

  it('(D)should display error message when entering invalid value)', () => {
    fixture.detectChanges();
    const invalidValues = ['a11', '1a1', '11a', '23', 'a'];
    const hostElement: HTMLElement = fixture.nativeElement;
    const inputBinary: HTMLInputElement = hostElement.querySelector('form [formcontrolname=inputBinary]')!;

    invalidValues.forEach(invalidValue => {
      inputBinary.value = invalidValue;
      inputBinary.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const spanError: HTMLSpanElement = hostElement.querySelector('form span')!;

      expect(spanError).withContext(`value: ${invalidValue}`).toBeTruthy();
    });
  });
});
