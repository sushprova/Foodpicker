import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup = new FormGroup({
  
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private loadingController:LoadingController,
    private alertController:AlertController,
    private authService:AuthService,
    private toastController:ToastController,
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',[Validators.required,
            Validators.minLength(6),]
        ],
      
      }
    );
  }

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

  async register(){
    
  //  const loading = await this.loadingController.create();
  //  await loading.present();

    const user = await this.authService.register(this.form.value);
  //  await loading.dismiss;

    if(user){
      this.router.navigateByUrl('/login',{replaceUrl:true});
    }else{
      const toast = await this.toastController.create({
        message: 'Registration failed. Please try again',
        position: 'bottom',
        color: 'warning',
        duration: 5000
      });
      toast.present();
    }
  }

}
