import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToMain() {
  	this.router.navigateByUrl('/');
  }
  
  restartGame() {
  }

}
