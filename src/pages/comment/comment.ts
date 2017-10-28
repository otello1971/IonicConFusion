import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment: FormGroup;

  constructor(public navCtrl: NavController, 
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {

      this.comment = this.formBuilder.group({
        rating: 5,
        comment: ['', Validators.required],
        author: ['', Validators.required],
        date: new Date().toISOString(),
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    this.viewCtrl.dismiss({comment: this.comment.value});
  }

}
