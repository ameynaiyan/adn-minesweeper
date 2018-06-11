import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToAbout() {
  	this.router.navigateByUrl('/about');
  }

  goToScores() {
  	this.router.navigateByUrl('/scores');
  }

  goToNew() {
  	this.router.navigateByUrl('/new');
  }

}
