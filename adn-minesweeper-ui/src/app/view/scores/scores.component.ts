import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'underscore';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {

  ls:any;
  highScores:any;
  constructor(private router: Router) { }

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

    var sortedArray = _.sortBy(this.ls.scores, function(sortedScores) {
	  return sortedScores;
	});

	this.highScores = [];

    for(let i=0;i<5;i++){
    	if(sortedArray[i]){
    		this.highScores.push(sortedArray[i]);
    	}else{
    		this.highScores.push(
	    		{
	    			"name":"-",
	    			"score":"-"
	    		}
	    	);
    	}
    }
  }

  clearScores() {
  	this.highScores = [];
  	for(let i=0;i<5;i++){
    	this.highScores.push(
    		{
    			"name":"-",
    			"score":"-"
    		}
    	);
    }

    this.ls.scores = [];
    localStorage.setItem("adn-minesweeper",JSON.stringify(this.ls));
  }
  
  goToMain() {
  	this.router.navigateByUrl('/');
  }

}
