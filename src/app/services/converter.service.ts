import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor() { }

  convertBinaryToDecimal(binaryValue: string): number {
    let decimalValue = 0;

    if(!binaryValue) return decimalValue;

    for(let i = 0; i < binaryValue.length; i++){
      const bit = +binaryValue.charAt(binaryValue.length - 1 - i);
      decimalValue += bit * 2**i;
    }

    return decimalValue;
  }
}
