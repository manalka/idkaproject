import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  title = 'IDKA';
  public isTokenThere : boolean;
  public term : string ="";
  constructor(private router: Router) {
    console.log("Token:  " + localStorage.getItem('token'));
    this.isTokenThere = localStorage.getItem('token') != null
}

search () {
    this.router.navigate(["/shop", this.term]).then(() => window.location.reload())
}
  ngOnInit(): void {
    
  }
  }

