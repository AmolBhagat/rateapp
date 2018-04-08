import { Component } from '@angular/core';
import { AlertController, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;

  constructor(public alertCtrl:AlertController,public view:ViewController) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
  }

  submit(){
    let alert = this.alertCtrl.create({
      title: 'Thank you ..!!',
      subTitle: 'Your response has been submitted!',
      buttons: ['OK']
    });
    alert.present();
    this.view.dismiss();
  }
  cancel(){
    this.view.dismiss();
  }


}
