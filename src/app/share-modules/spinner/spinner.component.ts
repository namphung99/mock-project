import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isActive: boolean = false;
  constructor(private uiService: UIService) { }

  ngOnInit(): void {
    this.uiService.emitSpinner.subscribe(res => this.isActive = res);
  }

}
