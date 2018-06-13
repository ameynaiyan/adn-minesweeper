import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cell } from '../../common/cell/cell'

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  private grid: any;
  private clock: number;
  private prob: number;
  private cellID: number;

  constructor(private router: Router) { 
    this.prob = 0.1;
    this.cellID = 0;
  }

  ngOnInit() {
    this.initGame();
  }

  getDefaultGrid() {
    return {
      rows:10,
      cols:20,
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
    switch(e.which){
      case 1:
        if(!cell.isDug()){
          cell.dig();
          if(cell.isMinePresent()){
            this.endGame();
          }else{
            this.scan(cell);
          }
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
