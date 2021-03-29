import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { AuthActions } from 'src/app/actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-reponsive',
  templateUrl: './menu-reponsive.component.html',
  styleUrls: ['./menu-reponsive.component.css']
})
export class MenuReponsiveComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() closeDrawer = new EventEmitter<boolean>();
  @Output() modalLogin = new EventEmitter<boolean>();
  @Output() modalRegister = new EventEmitter<boolean>();


  logout: any;
  isloading: boolean = false;
  error: any;
  logout$: Observable<any> = this.store.select(state => state.auth.logout);
  isLoading$: Observable<boolean> = this.store.select(state => state.auth.isloadingLogOut);
  error$: Observable<any> = this.store.select(state => state.auth.errorLogout);
  constructor(private store: Store<{ auth: any, productsCart:any }>, private message: NzMessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.logout$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.logout = data
        if (data.success) {
          window.location.reload()
        }
      }
    })
    this.isLoading$.subscribe((data: any) => {
      this.isloading = data
    })
    this.error$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.message.create('error', `Ah ocurrido un error inesperado al registrar, por favor inténtalo mas tarde`);
        this.error = data
      }
    })
  }

  close(): void {
    this.closeDrawer.emit(false);
  }

  showModalLogin(){
    this.close();
    this.modalLogin.emit(true);
  }

  showModalRegister(){
    this.close();
    this.modalRegister.emit(true);
  }

  checkSesion() {
    return this.authService.authenticated;
  }

  onLogout() {
    this.close()
    this.store.dispatch(AuthActions.logout());
  }
}
