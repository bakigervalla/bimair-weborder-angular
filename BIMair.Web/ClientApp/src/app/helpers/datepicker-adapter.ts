import {Component, Injectable} from '@angular/core';
import {NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Console } from 'console';
import moment from 'moment';

@Injectable()
export class NgbStringAdapter extends NgbDateAdapter<Date> {

  readonly DELIMITER = '/';

  fromModel(value: Date | null): NgbDateStruct | null {
    if (value) {

      var mom = moment.utc(value).format('DD/MM/YYYY');
      const date = mom.split(this.DELIMITER);

      return {
          day : parseInt(date[0], 10),
          month : parseInt(date[1], 10),
          year : parseInt(date[2], 10)
          };
    }

    return null;
  }

  toModel(date: NgbDateStruct | null): Date | null {
    return new Date(date.year, date.month-1, date.day, 13,0,0,0);
     // moment(date).format('DD/MM/yyyy'); // date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
 @Injectable()
 export class CustomDateParserFormatter extends NgbDateParserFormatter {

   readonly DELIMITER = '/';

   parse(value: string): NgbDateStruct | null {
     if (value) {
       const date = value.split(this.DELIMITER);
       return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
       };
     }
     return null;
   }

   format(date: NgbDateStruct | null): string {
     return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
   }
 }
