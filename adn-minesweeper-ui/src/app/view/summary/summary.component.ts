import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService } from '../../global-config.service';
import _ from 'underscore';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  gc:GlobalConfigService;
  summary:any;
  ls:any;
  highScores:any;
  newHSName:string;
  newHSMessage:boolean;

  constructor(private router: Router, gc:GlobalConfigService) {
    this.summary = gc.summary;
    this.newHSMessage = true;
    this.newHSName = "";
  }

  ngOnInit() {
    if(localStorage.getItem("adn-minesweeper")==null){
        var newObj = {
          scores:[]
        };
        localStorage.setItem("adn-minesweeper",JSON.stringify(newObj));
        this.ls = newObj;
    }else{
      this.ls = JSON.parse(localStorage.getItem("adn-minesweeper"));
    }

    //var sortedArray = _.sortBy(this.ls.scores, (sortedScores) => {
    //  return sortedScores;
    //});
    var sortedArray = this.sortScores(this.ls.scores);

    this.highScores = [];

    for(let i=0;i<5;i++){
      if(sortedArray[i]){
        this.highScores.push(sortedArray[i]);
      }else{
        this.highScores.push(
          {
            "name":"-",
            "score":"0"
          }
        );
      }
    }

    var maxCandidate = false;
    for(let i=0;i<this.highScores.length;i++){
      if((sortedArray.length<5) || (this.summary.winStatus && this.highScores[i].name!="-" && this.highScores[i].score>this.summary.timeTaken)){
        maxCandidate = true;
        break;
      }
    }

    if(maxCandidate){
      this.newHSMessage = true;
    }else{
      this.newHSMessage = false;
    }
  }

  sortScores(arr) {
    for(let i=0; i<arr.length;i++){
      for(let j=i; j<arr.length;j++){
        if(i!=j && arr[i].score>arr[j].score){
          var tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }
      }
    }
    return arr;
  }

  submitNewHSName() {
    if(this.newHSName!=""){
      this.hideNewHSMessage();
      this.ls.scores.push(
        {
          "name":this.newHSName,
          "score":this.summary.timeTaken
        }
      );
      localStorage.setItem("adn-minesweeper",JSON.stringify(this.ls));

      //var sortedArray = _.sortBy(this.ls.scores, (sortedScores) => {
      //  return sortedScores;
      //});
      var sortedArray = this.sortScores(this.ls.scores);

      this.highScores = [];

      for(let i=0;i<5;i++){
        if(sortedArray[i]){
          this.highScores.push(sortedArray[i]);
        }else{
          this.highScores.push(
            {
              "name":"-",
              "score":"0"
            }
          );
        }
      }
    }
  }

  hideNewHSMessage() {
    this.newHSMessage=false;
  }
  
  goToMain() {
  	this.router.navigateByUrl('/');
  }
  
  restartGame() {
  	this.router.navigateByUrl('/play');
  }

}
