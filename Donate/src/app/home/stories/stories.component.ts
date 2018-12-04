import { Component, OnInit } from '@angular/core';
import { StoriesService } from './stories.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  stories: any[] = [];

  constructor(
    private _storiesService: StoriesService
  ) { }

  ngOnInit() {
    this._storiesService.getFeed((response: any[]) => {
      this.stories = response;
    });
  }

}
