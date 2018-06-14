import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService } from '../../global-config.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  gc:GlobalConfigService;
  summary:any;
  ls:any;

  constructor(private router: Router, gc:GlobalConfigService) {
    this.summary = gc.summary;
  }

  ngOnInit() {
    if(typeof(localStorage.getItem("adn-minesweeper"))=='undefined'){
        var newObj = {
          scores:[]
        };
        localStorage.setItem("adn-minesweeper",JSON.stringify(newObj));
    }else{
      this.ls = JSON.parse(localStorage.getItem("adn-minesweeper"));
    }
  }
  
  goToMain() {
  	this.router.navigateByUrl('/');
  }
  
  restartGame() {
  	this.router.navigateByUrl('/play');
  }

}
