import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<boolean>(true);
  currentLayoutClass = this.messageSource.asObservable();
  constructor() { }
  changeLayoutClass(status: boolean) {
    this.messageSource.next(status);
  }
}
