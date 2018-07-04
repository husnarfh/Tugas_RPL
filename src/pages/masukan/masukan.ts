import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,  LoadingController, ToastController, MenuController  } from 'ionic-angular';
import { ProfilPage } from '../profil/profil';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { Data } from '../../providers/data';
/**
 * Generated class for the MasukanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
   selector: 'page-masukan',
   templateUrl: 'masukan.html',
 })
 export class MasukanPage {

   data:any = {};
   regexp = new RegExp(/\d/);

   constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public loadCtrl: LoadingController,
               private alertCtrl: AlertController,
               public toastCtrl: ToastController,
               public menuCtrl: MenuController,
               public http: Http) {
       this.data.nim = '';
       this.data.jumlahkaleng = '';
       this.data.jumlahbotol1 = '';
       this.data.jumlahbotol2 = '';
       this.data.harga = '';
       this.data.dt = '';
       this.data.response = '';
       this.data.tanggalbalik = '';
     this.http = http;
   }

   showAlert() {
     let alert = this.alertCtrl.create({
       title: 'Succes!',
       subTitle: 'Nominal Anda sebesar Rp. 0000,00',
       buttons: [
         {
           text: 'OK',
           handler: () => {
             this.navCtrl.setRoot(ProfilPage);
           }
         }

       ]
     });
     alert.present();
   }

   save(){
     var link = 'http://wahsampah2.atspace.cc/insert-barang.php';
     var newUser = JSON.stringify({nim: this.data.nim, jumlahkaleng: this.data.jumlahkaleng, jbotol500: this.data.jumlahbotol1, jbotol500atas: this.data.jumlahbotol2, harga: this.data.harga})
     // console.log(newUser);
     this.http.post(link, newUser).subscribe(data => {
       this.data.response = data["_body"]; //https://stackoverflow.com/questions/39574305/property-body-does-not-exist-on-type-response
       // console.log(this.data.response);
         this.loading();
       this.showAlert();
   }, error => {
     console.log("Oooops!");
   });
   }
   check(){
     if(this.data.nim === '' || this.data.jumlahkaleng === '' || this.data.jumlahbotol1 === '' || this.data.jumlahbotol2 === ''){
       let toast = this.toastCtrl.create({
         message: 'Please fill all the data field',
         duration: 2000,
         position: 'bottom'
       });
       toast.present();
     } else if(this.regexp.test(this.data.jumlahkaleng) == false) {
       let toast = this.toastCtrl.create({
         message: 'Please check jumlah kaleng',
         duration: 2000,
         position: 'bottom'
       });
       toast.present();
     }else if(this.regexp.test(this.data.jumlahbotol1) == false) {
       let toast = this.toastCtrl.create({
         message: 'Please check jumlah botol<500ml',
         duration: 2000,
         position: 'bottom'
       });
       toast.present();
     }else if(this.regexp.test(this.data.jumlahbotol2) == false) {
       let toast = this.toastCtrl.create({
         message: 'Please check jumlah botol>500ml',
         duration: 2000,
         position: 'bottom'
       });
       toast.present();
     } else {
       this.save();
     }
   }
   ionViewDidLoad() {
     console.log('ionViewDidLoad MasukanPage');
   }
   loading(){
     let loader = this.loadCtrl.create({
       content: "Please wait...",
       duration: 1000
     });
     loader.present();
   }
 }
