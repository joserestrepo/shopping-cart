import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { save } from './../utils/sesionStorage'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: firebase.default.User | null;
  public loading: boolean = true;
  constructor(private afsAuth: AngularFireAuth, private firestore: AngularFirestore) {
    this.user = null;
    this.afsAuth.authState.subscribe(data => {
      this.user = data;
      this.loading= false;
    })
  }

  get authenticated(): boolean {
    return this.user != null;
  }

  get currentUser(): firebase.default.User | null {
    return this.user;
  }

  async loginEmailUser(email: string, password: string) {
    try {
      await this.afsAuth.signInWithEmailAndPassword(email, password)
      return { success: true, message: 'User login success' };
    } catch (error) {
      throw error;
    }

  }

  async sigUpEmail(email: string, password: string, name: string) {
    try {
      const data = await this.afsAuth.createUserWithEmailAndPassword(email, password);
      await data.user?.updateProfile({ displayName: name });
      await this.firestore.collection('carts').add({ status: 'pending', user_id: data.user?.uid })
      return { success: true, message: 'User create success' };
    } catch (error) {
      throw error;
    }

  }

  public logoutUser() {
    return this.afsAuth.signOut();
  }
}
