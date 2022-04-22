import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMapMarkerAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import { Token } from 'src/app/models/Token';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
    marker = faMapMarkerAlt;
    phoneIcon = faPhoneAlt

    user !: User;
    editMode : boolean = false;
     
    Nom_utlisateur ! : string
    Nom !: string
    Prenom !:string
    Ville!:string
    adresse !: string
    //Sexe !:string
    email !: string
    phone ! : string
    profile !:string

    constructor(private usersService : UsersService, private router : Router) { }

    ngOnInit(): void {
        if (!localStorage.getItem('token')) {
            this.router.navigateByUrl('/login')
            return
        }

        this.usersService.getUserByToken().subscribe((user : User) => {
            this.user = user
            
            this.Nom = user.Nom;
            this.Nom_utlisateur = user.Nom_utlisateur;
            this.Prenom=user.Prenom;
            this.Ville=user.Ville;
            this.adresse = user.adresse;
            //this.Sexe=user.Sexe;
            this.email = user.email;
            this.phone = user.phone;
            this.profile=user.profile;
        }, (error : ErrorEvent) => {
            console.log(error)
        })
    }

    logOut () {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/login').then(() => window.location.reload())
    }

    updateUser () {
        this.usersService.updateUser(this.user.id, this.Nom_utlisateur,this.Nom,this.Prenom,this.Ville, this.email,this.user.password,this.adresse, this.phone,this.profile).subscribe((user : User) => {
            this.usersService.createToken(user.Nom_utlisateur).subscribe((token : Token) => {
                localStorage.removeItem('token')
                console.log(localStorage.getItem('token'));
                localStorage.setItem('token', token.token)
                console.log(localStorage.getItem('token'));
                window.location.reload()
            })
        })
    }

    deleteUser () {
        if (window.confirm("Etes-vous sûr que vous voulez supprimer?")) {
            this.usersService.deleteUser(this.user.id.toString()).subscribe(res => {
                this.logOut()
            })
        }
    }
}
