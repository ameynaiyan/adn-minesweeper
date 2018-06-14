import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService } from '../../global-config.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  
  difficulty: number;
  gridSize: number;
  gc:GlobalConfigService;

  constructor(private router: Router, gc:GlobalConfigService) {
    this.difficulty = gc.difficulty;
    this.gridSize = gc.gridSize;
    this.gc = gc;
  }

  ngOnInit() {
  }

  setDifficulty(val:number) {
    this.difficulty = val;
    this.gc.difficulty = val;
  }

  setGridSize(val:number) {
    this.gridSize = val;
    this.gc.gridSize = val;
  }

  goToMain() {
  	this.router.navigateByUrl('/');
  }
  
  startGame() {
    this.gc.gameInProgress = true;
  	this.router.navigateByUrl('/play');
  }

}
