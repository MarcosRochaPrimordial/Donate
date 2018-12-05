import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './stories/stories.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [StoriesComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
