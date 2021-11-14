import { UIService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(private route: Router, private uiService: UIService) { }

  ngOnInit() {
  }

  redirectHomepage() {
    this.uiService.emitSpinner.emit(true);
    setTimeout(() => {
      this.route.navigate(['/home']);
      this.uiService.emitSpinner.emit(false);
    }, 1000)
  }
}
