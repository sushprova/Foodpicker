import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {
  
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController

  ) { }

  // get email(){
  //   return this.form.get('email');
  // }

  // get password(){
  //   return this.form.get('password');
  // }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {

        email: ['', [Validators.required, Validators.email]],
        password: [
          '', [Validators.required,
          Validators.minLength(6),]
        ],

      }
    );
  }
  //more of a generic form to get anything by mentioning the key
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }



  async login() {
    // const loading = await this.loadingController.create();
    //loading.present();

    const user = await this.authService.login(this.form.value);
    //loading.dismiss;

    if (user) {
      this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    } else {
      const toast = await this.toastController.create({
        message: 'Login failed. Please try again',
        position: 'bottom',
        color: 'warning',
        duration: 5000
      });
      toast.present();
    }
  }
  gotoForgot() {
    this.router.navigateByUrl('/forgot-pass');
  }

}
