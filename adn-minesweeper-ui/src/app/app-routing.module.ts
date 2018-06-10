import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './view/main/main.component';
import { NewComponent } from './view/new/new.component';
import { SceneComponent } from './view/scene/scene.component';
import { ScoresComponent } from './view/scores/scores.component';
import { SummaryComponent } from './view/summary/summary.component';
import { BackdropComponent } from './common/backdrop/backdrop.component';

const routes: Routes = [
	{
		path: '', 
		component: MainComponent
	},
	{
		path: 'new', 
		component: NewComponent
	},
	{
		path: 'play', 
		component: SceneComponent
	},
	{
		path: 'scores', 
		component: ScoresComponent
	},
	{
		path: 'summary', 
		component: SummaryComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
