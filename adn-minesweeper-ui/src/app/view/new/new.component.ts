import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToMain() {
  	this.router.navigateByUrl('/');
  }
  
  startGame() {
  	this.router.navigateByUrl('/play');
  }

}
