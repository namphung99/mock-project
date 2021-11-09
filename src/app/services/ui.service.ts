import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  toggleSpinner: boolean = false;
  emitSpinner: EventEmitter<boolean> = new EventEmitter();
  constructor() {
    this.emitSpinner.emit(false);
  }
}
