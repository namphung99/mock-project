import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIService {
  toggleSpinner: boolean = false;
  emitSpinner: EventEmitter<boolean> = new EventEmitter();
  public isSlug = false;
  constructor() {
    this.emitSpinner.emit(false);
  }

  getIsSlug(): boolean {
    return this.isSlug;
  }

  setIsSlug(value: boolean) {
    this.isSlug = value;
  }
}
