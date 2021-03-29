import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from 'src/app/actions';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() modalVisible: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  validateForm!: FormGroup;

  login: any;
  isloading: boolean = false;
  error: any;
  login$: Observable<any> = this.store.select(state => state.auth.login);
  isLoading$: Observable<boolean> = this.store.select(state => state.auth.isloadingLogin);
  error$: Observable<any> = this.store.select(state => state.auth.errorLogin);

  constructor(private fb: FormBuilder, private store: Store<{ auth: any }>, private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
    this.login$.subscribe((data: any) => {
      if (data != null || data != undefined) {
        this.login = data
        if (data.success) {
          window.location.reload()
        }
      }
    })
    this.isLoading$.subscribe((data: any) => {
      this.isloading = data
    })
    this.error$.subscribe((data: any) => {
      if (data != null || data != undefined) {
        if (data?.code === 'auth/wrong-password' || data?.code === 'auth/user-not-found') {
          this.message.create('error', `Por favor verifica tus datos`);
        } else if (data?.code === 'auth/too-many-requests') {
          this.message.create('error', `Tu cuenta ha sido bloqueado temporalmente, por favor inténtalo mas tarde`);
        } else {
          this.message.create('error', `Ah ocurrido un error inesperado al registrar, por favor inténtalo mas tarde`);
        }
      }
    })
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      const data = {
        email: this.validateForm.get('email')?.value,
        password: this.validateForm.get('password')?.value
      }
      this.store.dispatch(AuthActions.login(data))
    }
  }

  handleCancel(): void {
    this.closeModal.emit(false);
  }

}
