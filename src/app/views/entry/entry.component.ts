import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateProfile } from "firebase/auth";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  public isLoading = false;
  public enteredName = '';

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void { }

  public onEnterClicked(): void {
    if (this.enteredName) {
      console.log(this.enteredName);
      this.isLoading = true;
      this.auth.signInAnonymously().then(res => {
        this.isLoading = false;
      });
    }
  }
}
