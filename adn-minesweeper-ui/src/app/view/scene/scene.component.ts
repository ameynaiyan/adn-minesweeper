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

  constructor(private router: Router) { 
    this.prob = 0.5;
  }

  ngOnInit() {
    this.initGame();
  }

  getDefaultGrid() {
    return {
      rows:5,
      cols:10,
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
  }

  initGame() {
    this.resetClock();
    this.grid = this.getDefaultGrid();
    this.initCells();
  }

  initCells(){
    for(let i=0; i<this.grid.rows; i++){
      for(let j=0; j<this.grid.cols; j++){
        let newCell = this.createCell();
        document.getElementById('game-grid').appendChild(newCell.el);
        this.grid.cells.push(newCell);
      }
    }

  }

  createCell() {
    var newCell = {
      config:new Cell(this.prob),
      el:this.createDOMElement(newCell)
    };

    return newCell;
  }

  createDOMElement(newCell:any) {
    let newEl = document.createElement('div');
    newEl.className = 'cell-wrapper';
    newEl.setAttribute('style','height:'+(500/this.grid.rows)+'px; width:'+(1000/this.grid.cols)+'px;');
    let newSubEl = document.createElement('div');
    newSubEl.className = 'cell d-flex flex-row justify-content-center align-items-center';
    let cellText = document.createElement('span');
    let me = this;
    newSubEl.addEventListener('mousedown',(e) => {
      switch(e.which){
        case 1:
          if(!newCell.config.isDug()){
            newCell.config.dig();
            if(newCell.config.isMinePresent()){
              me.endGame();
            }else{
              let count = me.countNeighbouringMines();
              newCell.config.setCount(count);
              if(count == 0){
                me.checkNeighbours();
              }
            }
          }
          break;
        case 3:
          if(newCell.config.isFlagged){
            newCell.config.setFlag(false);
          }else{
            newCell.config.setFlag(true);
          }
          break;
      }
      
    },false);
    newSubEl.appendChild(cellText);
    newEl.appendChild(newSubEl);
    return newEl;
  }

  digArea() {

  }

  checkNeighbours() {
    for(let i=0;i<8;i++){

    }
  }

  countNeighbouringMines() {
    return 0;
  }

  placeFlag() {

  }

  removeFlag() {

  }

  endGame() {

  }


}
