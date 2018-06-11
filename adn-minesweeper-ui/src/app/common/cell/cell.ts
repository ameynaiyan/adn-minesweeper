export class Cell{
	private opened:boolean;
	private flagged:boolean;
	private mine: boolean;
	private count: number;

	constructor(private prob: number) { 
		this.opened = false;
		this.flagged = false;
		this.count = 0;
		this.mine = this.assignMine(prob);
  	}

  	assignMine(prob) {
  		return true;
  	}

  	dig() {
  		this.opened = true;
  	}

  	isDug() {
  		return this.opened;
  	}

  	setFlag(val:boolean) {
  		this.flagged = val;
  	}

  	isFlagged() {
  		return this.flagged;
  	}

  	isMinePresent() {
  		return this.mine;
  	}

  	setCount(val:number) {
  		this.count = val;
  	}

  	getCount() {
  		return this.count;
  	}
}