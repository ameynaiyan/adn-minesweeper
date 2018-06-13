export class Cell{
	private opened:boolean;
	private flagged:boolean;
	private mine: boolean;
	public count: any;
	public height: number;
	public width: number;
  public xPos:number;
  public yPos:number;

	constructor(private prob: number,private grid:any,public pos:string) { 
		this.opened = false;
		this.flagged = false;
		this.count = 0;
		this.mine = this.assignMine(prob);
		this.height = 1000/grid.rows;
		this.width = 500/grid.cols;
    this.xPos = parseInt(pos.split('-')[0]);
    this.yPos = parseInt(pos.split('-')[1]);
	}

	assignMine(prob) {
    var num=Math.random();
    if(num<prob){
      return true;
    }else{
      return false;
    }
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