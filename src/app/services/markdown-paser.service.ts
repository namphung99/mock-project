import { Injectable } from '@angular/core';
import * as marked from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownPaserService {
  private md!: any;
  constructor() {
    this.md = marked;

    this.md.setOptions({
      gfm: true,
      break: true,
    })
  }

  convert(markdown: string){
    return this.md.parse(markdown);
  }
}
