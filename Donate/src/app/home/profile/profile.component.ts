import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  story: string = "";

  constructor(
    private _profileService: ProfileService
  ) { }

  ngOnInit() {
    this._profileService.getOwnStory()
        .then((response: any) => {
          if(response) {
            this.story = response.Story.presentationText;
          }
        })
  }

  saveStory() {
    this._profileService.saveStory(this.story);
  }

  isDonor() {
    let user = JSON.parse(localStorage.getItem("API_KEY"));
    return user.isDonor;
  }

}
