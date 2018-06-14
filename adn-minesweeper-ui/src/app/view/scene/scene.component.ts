import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cell } from '../../common/cell/cell';
import { GlobalConfigService } from '../../global-config.service';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  private grid: any;
  private clock: number;
  private prob: number;
  private rows:number;
  private cols:number;
  gc:GlobalConfigService;

  constructor(private router: Router, gc:GlobalConfigService) { 
    this.gc = gc;
    switch(gc.difficulty){
      case 0:
        this.prob = 0.06;
        break;
      case 1:
        this.prob = 0.1;
        break;
      case 2:
        this.prob = 0.15;
        break;
    }
    
    switch(gc.gridSize){
      case 0:
        this.rows = 5;
        this.cols = 10;
        break;
      case 1:
        this.rows = 10;
        this.cols = 20;
        break;
      case 2:
        this.rows = 15;
        this.cols = 30;
        break;
    }
  }

  ngOnInit() {
    if(this.gc.gameInProgress==false){
      this.goToMain();
    }
    this.initGame();
  }

  getDefaultGrid() {
    var rows;
    var cols;

    return {
      rows:this.rows,
      cols:this.cols,
      cells:[],
    }
  }

  resetClock(){
    this.clock = 0;
  }

  goToMain() {
  	this.router.navigateByUrl('/');
  }
  
  restartGame() {
    this.resetClock();
    this.grid = this.getDefaultGrid();
    this.initCells();
  }

  initGame() {
    this.resetClock();
    this.grid = this.getDefaultGrid();
    this.initCells();
  }

  initCells(){
    for(let i=0; i<this.grid.rows; i++){
      let row = [];
      for(let j=0; j<this.grid.cols; j++){
        row.push(this.createCell(j,i));
      }
      this.grid.cells.push(row);
    }

    if(this.grid.cells[0][0].isMinePresent()){
      this.restartGame();
    }else{
      return;
    }
  }

  createCell(i,j) {
    return new Cell(this.prob,this.grid,i+'-'+j);
  }


  cellClicked(e,cell) {
    if(!cell.isDug()){
      switch(e.which){
        case 1:
          cell.dig();
          if(cell.isMinePresent()){
            this.endGame();
          }else{
            this.scan(cell);
          }
          break;
        case 3:
          if(cell.isFlagged()){
            cell.setFlag(false);
          }else{
            cell.setFlag(true);
          }
          break;
      }
    }
    e.stopPropogation();
  }

  scan(cell) {
    var count = this.countNeighbouringMines(cell);
    if(count == 0){

      for(let i=-1;i<=1;i++){
        for(let j=-1;j<=1;j++){
          if(cell.yPos+i>=0 && cell.xPos+j>=0 && cell.yPos+i<this.grid.rows && cell.xPos+j<this.grid.cols && this.grid.cells[cell.yPos+i][cell.xPos+j] && !this.grid.cells[cell.yPos+i][cell.xPos+j].isDug()){
            cell.dig();
            this.scan(this.grid.cells[cell.yPos+i][cell.xPos+j]);
          }
        }
      }

      cell.setCount('');
      return;
    }else{
      cell.dig();
      cell.setCount(count);
      return;
    }
  }

  countNeighbouringMines(cell) {
    var count = 0;

    for(let i=-1;i<=1;i++){
      for(let j=-1;j<=1;j++){
        if(cell.yPos+i>=0 && cell.xPos+j>=0 && cell.yPos+i<this.grid.rows && cell.xPos+j<this.grid.cols && this.grid.cells[cell.yPos+i][cell.xPos+j] && this.grid.cells[cell.yPos+i][cell.xPos+j].isMinePresent()){
          count++;
        }
      }
    }

    return count;
  }

  endGame() {

  }

  goToSummary(){

  }


}
