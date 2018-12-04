import { Routes, RouterModule } from "@angular/router";
import { StoriesComponent } from './stories/stories.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: StoriesComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {}