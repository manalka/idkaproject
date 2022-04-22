import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/Token';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    /*  public username !: string;
      public nom !: string;
      public prenom !:string;
      public ville!:string;
     // public Sexe !:string
      public password ! : string;
      public passwordConfirm !: string;
      public email !: string;
      public address !: string;
      public phone !: string;
      public profile !:string;
  
      public error !: string*/
    registerForm: FormGroup;


    constructor(private usersService: UsersService, private router: Router, private fb: FormBuilder, private service : RegisterService) { }
    user!: User;
    ngOnInit(): void {
        this.registerForm = this.fb.group({
            username:  [''],
            password:  [''],
            email:  [''],
            nom:  [''] ,
            address: [''],
            phone:  [''],
            prenom:   [''],
            ville:   ['']

          });

     /*   if (localStorage.getItem('token')) {
            this.router.navigateByUrl('/account')
        }*/
    }
    onSubmit(){
        console.log(this.registerForm);
        this.service.register(this.registerForm.value).subscribe(
            rest => console.log(rest)
        )
    }

  /*  register() {
        const emailform = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.error = ''

        if (!this.email || !this.email.match(emailform)) {
            this.error = "L'email n'est pas valide"
            return
        }

        if (this.password != this.passwordConfirm) {
            this.error = "Les mots de passe ne correspondent pas"
            return
        }

        this.usersService.register(this.Nom_utlisateur, this.Nom, this.Prenom, this.Ville, this.email, this.password, this.adresse, this.phone, this.profile).subscribe((token: Token) => {
            localStorage.setItem('token', token.token);
            this.router.navigateByUrl('/account').then(() => window.location.reload())
        }, (error: ErrorEvent) => {
            this.error = error.error
        })
    }*/
}
