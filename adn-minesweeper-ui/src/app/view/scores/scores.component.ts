import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  goToMain() {
  	this.router.navigateByUrl('/');
  }

}
