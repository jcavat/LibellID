import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { start } from 'repl';

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

  /**
   * Returns the current date index in flyPeriod
   * 
   * Examples : -1  => 08/04/2017 (out of flyperiod)
   *             2  => 08/06/2017 (index of june)
   */
  public static getCurrentDateIndex(): number {
    let startMounth=0;
    let endMounth = 11;
    let date = new Date();

    let index = date.getMonth()-startMounth;

    //test if out of flyperdiod
    if(index<=0 || (index>(endMounth-startMounth))){
      index=-1;
    }

    return index;
  }

}