import { Injectable } from '@angular/core';

@Injectable({
 	providedIn: 'root'
})
export class GlobalConfigService {
	
	public difficulty:number;
	public gridSize:number;
	public timeTaken:number;
	public gameInProgress:boolean;


	constructor() { 
		this.difficulty = 0;
		this.gridSize = 0;
		this.timeTaken = 0;
		this.gameInProgress = false;
	}
}
