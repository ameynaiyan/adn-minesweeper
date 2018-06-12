export class Cell{
	private opened:boolean;
	private flagged:boolean;
	private mine: boolean;
	public count: number;
	public height: number;
	public width: number;

	constructor(private prob: number,private grid:any) { 
		this.opened = false;
		this.flagged = false;
		this.count = 0;
		this.mine = this.assignMine(prob);
		this.height = 1000/grid.rows;
		this.width = 500/grid.cols;
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