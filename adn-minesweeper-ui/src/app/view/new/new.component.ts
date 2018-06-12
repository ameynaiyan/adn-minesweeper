import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  
  difficulty: number;

  constructor(private router: Router) {
    this.difficulty = 0;
  }

  ngOnInit() {
  }

  setDifficulty(val:number) {
    this.difficulty = val;
  }

  goToMain() {
  	this.router.navigateByUrl('/');
  }
  
  startGame() {
  	this.router.navigateByUrl('/play');
  }

}
