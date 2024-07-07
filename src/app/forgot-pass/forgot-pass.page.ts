import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {

  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private toastController:ToastController,
    private router:Router,
    
  ) { 
    this.form = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

  
	get email() {
		return this.form.get('email');
	}

	async sendEmail() {
		try {
			await this.authService.forgotPassword(this.form.value.email);
			this.router.navigateByUrl('/login');
			const toast = await this.toastController.create({
        message: 'Check your email to reset password.',
        position: 'bottom',
        color: 'warning',
        duration: 5000
      });
      toast.present();
		} catch (error) {
			console.warn(error)
			const toast = await this.toastController.create({
        message: 'Ensure correct email address has been provided.',
        position: 'bottom',
        color: 'warning',
        duration: 5000
      });
      toast.present();
  }
  }
  ngOnInit() {
  }
  

}
