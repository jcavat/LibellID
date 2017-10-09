import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * A provider for various useful methods.  
 * As this provider grows, it should be decomposed into more specific providers (like the "toasts" one).
 */
@Injectable()
export class Utils {

  constructor() { }

  /**
   * Returns the current date and time, formatted as specified in argument.  
   * Uses DatePipe : https://angular.io/docs/ts/latest/api/common/index/DatePipe-pipe.html.
   * Check this doc to see all the formatting options available.  
   * 
   * Examples : dd/MM/y  => 08/04/2017
   */
  public static getCurrentDatetime(format: string): string {
    let datePipe = new DatePipe('fr-FR');
    return datePipe.transform(new Date(), format);
  }


}