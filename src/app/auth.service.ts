import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail  } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async register({ email, password }: any) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth, email, password
      );
      return user;
    } catch (e) {
      return null;
    }
  }
  async login({ email, password }: any) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth, email, password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async logout() {
   return await signOut(this.auth);
  }

  async forgotPassword(email: string){
    return await sendPasswordResetEmail(this.auth,email);
  }

  getUserEmail(){
    return this.auth.currentUser?.email;
  }
}
