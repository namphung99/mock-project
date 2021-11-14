import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm-login',
  templateUrl: './modal-confirm-login.component.html',
  styleUrls: ['./modal-confirm-login.component.scss']
})
export class ModalConfirmLoginComponent implements OnInit {

  constructor(
    private router: Router,
    private activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['/login']);
    this.activeModal.close()
  }

  onCancel(){
    this.activeModal.close()
  }

}
