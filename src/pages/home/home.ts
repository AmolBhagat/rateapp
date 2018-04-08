import { Component, ViewChild,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import{FirstPage} from '../first/first';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  @ViewChild('username') uname;
  @ViewChild('password') password;
  
  constructor(public navCtrl: NavController) {
    
  }
  ngOnInit(){
    this.uname.value="admin"
    this.password.value="admin"
  }
  signIn(){
    if(this.uname.value =="admin" && this.password.value =="admin"){
      this.navCtrl.push(FirstPage);
    }
    
  }

}
