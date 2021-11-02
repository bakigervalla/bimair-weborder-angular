import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from "@angular/core";

@Injectable()
export class NgbDateFormat extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const dateParts = value.trim().split('/');

      let dateObj: NgbDateStruct = { day: <any>null, month: <any>null, year: <any>null }
      const dateLabels = Object.keys(dateObj);

      dateParts.forEach((datePart, idx) => {
        dateObj[dateLabels[idx]] = parseInt(datePart, 10) || <any>null;
      });
      return dateObj;
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ?
      `${padNumber(date.day)}/${padNumber(date.month)}/${date.year || ''}` :
      '';
  }
}

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return "";
  }
}



//   parse(value: string): NgbDateStruct {
//     if (value) {
//       const dateParts = value.trim().split("/");
//       if (dateParts.length === 1 && isNumber(dateParts[0])) {
//         return { day: toInteger(dateParts[0]), month: null, year: null };
//       } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
//         return {
//           day: toInteger(dateParts[0]),
//           month: toInteger(dateParts[1]),
//           year: null
//         };
//       } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
//         return {
//           day: toInteger(dateParts[0]),
//           month: toInteger(dateParts[1]),
//           year: toInteger(dateParts[2])
//         };
//       }
//     }
//     return null;
//   }

//   format(date: NgbDateStruct): string {

//     if (date == null){
//       console.log('is null');
//       return "";
//     }

//     let d = date ? `${isNumber(date.day) ? padNumber(date.day) : ""}/${isNumber(date.month) ? padNumber(date.month) : ""}/${date.year }` : "";
//     console.log(d);
//     var dd = moment(d).format('DD/MM/YYYY');
//     console.log(dd);
// return dd;
//     // return date ? `${isNumber(date.day) ? padNumber(date.day) : ""}/${isNumber(date.month) ? padNumber(date.month) : ""}/${date.year }` : "";
//   }
// }
// export function toInteger(value: any): number {
//   return parseInt(`${value}`, 10);
// }

// export function isNumber(value: any): value is number {
//   return !isNaN(toInteger(value));
// }

// export function padNumber(value: number) {
//   if (isNumber(value)) {
//     return `0${value}`.slice(-2);
//   } else {
//     return "";
//   }
// }
