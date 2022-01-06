import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberMasking'
})
export class NumberMaskingPipe implements PipeTransform {

  transform(value: any): any {
    if(value){
      value=value.toString();
      // let maskedSection = value.slice(0, -visibleDigits);
      // let visibleSection= value.slice(-visibleDigits);
      // return maskedSection.replace(/./g, "X") + "-" + visibleSection;
      let maskedSection1 = value.slice(4,8);
      let maskedSection2 = value.slice(8,12);
      let visibleSection1= value.slice(0,4);
      let visibleSection2=value.slice(12,16);
      return visibleSection1 + " " + maskedSection1.replace(/./g, "X") + " " +  maskedSection2.replace(/./g, "X") + " " + visibleSection2;
    }
    else{
      return value;
  }
  }
}
