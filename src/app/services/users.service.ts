import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/Token';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
    constructor(private http : HttpClient) { }
    register (
        Nom_utlisateur : string,
        Nom : string,
        Prenom :string,
        Ville:string,
        adresse : string,
        //Sexe :string,
        email : string,
        password : string,
        phone  : string,
        profile :string
        ) : Observable<Token> {
        return this.http.post<Token>(`${environment.API_URL}/register`, {
            Nom_utlisateur ,
            Nom ,
            Prenom ,
            Ville ,
            adresse ,
           // Sexe ,
            email ,
            password ,
            phone ,
            profile ,
        })
    }
    login (Nom_utlisateur : string, password : string) : Observable<Token> {
        return this.http.post<Token>(`${environment.API_URL}/login`, {
            Nom_utlisateur,
            password
        })
    }

    createToken (Nom_utlisateur : string) : Observable<Token> {
        return this.http.post<Token>(`${environment.API_URL}/api/create-token`, {
            Nom_utlisateur
        });
    }

    getUsers () : Observable<User[]> {
        return this.http.get<User[]>(`${environment.API_URL}/api/users`);
    }

    getUser (id : string) : Observable<User> {
        return this.http.get<User>(`${environment.API_URL}/api/users/${id}`);
    }

    getUserByToken () : Observable<User> {
        return this.http.get<User>(`${environment.API_URL}/user`, {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + localStorage.getItem('token'),
              'Content-Type': 'application/json'
            })
        });
    }

    updateUser (id : Number,
        Nom_utlisateur : string,
        Nom : string,
        Prenom :string,
        Ville:string,
        adresse : string,
       // Sexe :string,
        email : string,
        password : string,
        phone  : string,
        profile :string) : Observable<User> {
        return this.http.put<User>(`${environment.API_URL}/api/users/${id}`, {
            Nom_utlisateur ,
            Nom ,
            Prenom ,
            Ville ,
            adresse ,
           // Sexe ,
            email ,
            password ,
            phone ,
            profile ,
        })
    }
/*
deletePost(id){
    return this.httpClient.delete(this.url+'/'+id);
  }
*/
    deleteUser (id : string) : Observable<any> {
        return this.http.delete(`${environment.API_URL}/api/users/${id}`);
    }
}
