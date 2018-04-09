import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, PopoverController, ViewController,LoadingController, ToastController  } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ApiService } from '../../app/service/service-api';
import {ModalController} from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { Ng2OrderModule } from 'ng2-order-pipe';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';



/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
  


})
export class FirstPage {
  text: string;
  limit: number = 5;
  truncating = true;
  imageURI:any;
  imageFileName:any;


  toggleValue : boolean = false;

  public graphData: any =[];
  public ratingList: any = [];
  public getComment;
  public comment : any = [];
  public stars = [];
  public date = [];
  public userIdFrom = [];
  public userIdTo =[];
  dat:any;
  lable:any;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  barChartColors: any [] = [{
    backgroundColor: "rgb(111, 168, 168)",
    borderWidth :2,
  }];
 
  public barChartLabels: string[] = ['30 Days','90 Days','1 Year','',''];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;


  public barChartData: any[] = [];

  // public barChartData: any[] = [
  //   { data:this.graphData.y,
  //     label: 'Rating'}
      
  // ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  /*public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    } */

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public view: ViewController,
    public alertCtrl: AlertController, public navParams: NavParams, 
    public modalCtrl:ModalController,private apiService: ApiService,
    private transfer: FileTransfer,
  private camera: Camera,
  public loadingCtrl: LoadingController,
  public toastCtrl: ToastController) {
    this.getRatingList();
    this.createReview();
    this.getGraphData();
  }
  showComment(rating:any){
    let alert = this.alertCtrl.create({
      subTitle: rating.comment,
      buttons: ['OK']
    });
    alert.present();
  }

 
  openModal(){
    var modalPage = this.modalCtrl.create('ModalPage');
    modalPage.present();
  }
  closeModal(){
    this.view.dismiss();
  }

  getRatingList() {
    this.ratingList=[];

    this.apiService.getRatingList().subscribe(res => {

      console.log('apiresult ', res.json())
      this.ratingList=res.json();
    
     
    })
  }
  getGraphData(){
    this.graphData=[];
    
    this.apiService.getGraphData().subscribe(res=>{
      console.log('apiresult',res.json())
      this.graphData=res.json();
      for(let item of this.graphData){
      this.dat=item.y;
    }
    this.barChartData= [
      { data:this.dat,
        //data:[6.12,7.23,5.99],
        label: 'Rating'}          
    ];
    
    })
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getRatingList();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  ngOnInit(){
    this.getRatingList();
  }
  popThis() {
    this.navCtrl.push(FirstPage);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });

  }
  createReview() {

    let review = {
      comment: this.comment,
      stars: this.stars,
      date: new Date(),
      userIdFrom:"101",
      userIdTo :"102"
    };
    this.apiService.createReview(review).subscribe(res => {

      console.log('apiresult ', res.json());
      this.ratingList.push(res.json())
    })


  }
  clickSubmit() {
    let alert = this.alertCtrl.create({
      title: 'Thank you ..!!',
      subTitle: 'Your response has been submitted!',
      buttons: ['OK']
    });
    alert.present();
    this.getRatingList();
    this.createReview() 
    this.navCtrl.push(FirstPage);

  }

  clickCancel() {
    this.navCtrl.push(FirstPage);
  }
  public sections: any = {
    Home:'Home',
    first: 'first',
    second: 'second',
    third: 'third',
    selectedSection: 'Home'
  };

  gotoSecond() {
    this.sections.selectedSection = this.sections.second;
  }

  gotoThird() {
    this.sections.selectedSection = this.sections.third;
  }

  
  toggled: boolean = false;
  emojitext: string;
   
  handleSelection(event) {
    this.comment = this.comment + " " + event.char;
  }
  public buttonClicked: boolean = false;

  onButtonClick() {
  
    this.buttonClicked = !this.buttonClicked;
  }
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
    this.onButtonClick();
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://107.170.218.205:4250/upload', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://107.170.218.205:4250/Images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');

  }

}
