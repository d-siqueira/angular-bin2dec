import { TestBed } from '@angular/core/testing';

import { ConverterService } from './converter.service';

describe('ConverterService', () => {
  let service: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return "11" when send "1011"', () => {
    const binaryValue = '1011'
    const decimalValue = service.convertBinaryToDecimal(binaryValue);
    expect(decimalValue).toEqual(11);
  });

  it('should return zero when send invalid value', () => {
    const invalidValues: any[] = ['', undefined, null];

    invalidValues.forEach(invalidValue => {
      const decimalValue = service.convertBinaryToDecimal(invalidValue);
      expect(decimalValue).toEqual(0);
    });
  });
});
