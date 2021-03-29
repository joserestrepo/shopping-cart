import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from 'src/app/actions';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() modalVisible: boolean = false;
  @Output() closeModal = new EventEmitter<boolean>();
  validateForm!: FormGroup;

  register: any;
  isloading: boolean = false;
  error: any;
  register$: Observable<any> = this.store.select(state => state.auth.register);
  isLoading$: Observable<boolean> = this.store.select(state => state.auth.isloadingRegister);
  error$: Observable<any> = this.store.select(state => state.auth.errorRegister);

  constructor(private fb: FormBuilder, private store: Store<{ auth: any }>, private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
    this.register$.subscribe((data: any) => {
      if ((JSON.stringify(this.register) !== JSON.stringify(data))) {
        this.register = data
        if (data.success) {
          window.location.reload()
        }
      }
    })
    this.isLoading$.subscribe((data: any) => {
      this.isloading = data
    })
    this.error$.subscribe((data: any) => {
      if (data != null) {
        if (data?.code === 'auth/email-already-in-use') {
          this.message.create('error', `Ya existe un usuario con este correo`);
        } else {
          this.message.create('error', `Ah ocurrido un error inesperado al registrar, por favor inténtalo mas tarde`);
        }
        this.error = data
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
        name: this.validateForm.get('name')?.value,
        email: this.validateForm.get('email')?.value,
        password: this.validateForm.get('password')?.value
      }
      this.store.dispatch(AuthActions.register(data))
    }
  }

  handleCancel(): void {
    this.closeModal.emit(false);
  }
}
