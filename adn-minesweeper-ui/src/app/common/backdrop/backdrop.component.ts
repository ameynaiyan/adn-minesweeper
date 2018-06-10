import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements AfterViewInit {

  @ViewChild('backdropcanvas') canvas: any;

   can_w :number;
   can_h :number;
   
	public ctx: CanvasRenderingContext2D;


	ball :any;
	   ball_color :any;
	   line_color :any;

	   R :number;
	   balls :any[];
	   alpha_f :number;
	    
	// Line
	   link_line_width :number;
	   dis_limit :number;
	   add_mouse_point :boolean;
	   mouse_in :boolean;
	   mouse_ball :any;
	
  constructor() { 

	
  }

  ngAfterViewInit() {

  	this.canvas = this.canvas.nativeElement;

   this.can_w = parseInt(this.canvas.getAttribute('width'));
   this.can_h = parseInt(this.canvas.getAttribute('height'));
   this.ctx = this.canvas.getContext('2d');


	this.ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 0,
      al: 1,
      phase: 0
   	};
	   this.ball_color = {
	       r: 255,
	       g: 255,
	       b: 255
	   };
	   this.line_color = {
	       r: 255,
	       g: 255,
	       b: 255
	   };

	   this.R = 4;
	   this.balls = [];
	   this.alpha_f = 0.03;
	    
	// Line
	   this.link_line_width = 0.5;
	   this.dis_limit = 260;
	   this.add_mouse_point = true;
	   this.mouse_in = false;
	   this.mouse_ball = {
	      x: 0,
	      y: 0,
	      vx: 0,
	      vy: 0,
	      r: 0,
	      type: 'mouse'
	   };

	   this.goMovie();

	   // Mouse effect
	 var me = this;
	document.addEventListener('mouseenter', function(){
	    console.log('mouseenter');
	    me.mouse_in = true;
	    me.balls.push(me.mouse_ball);
	});
	document.addEventListener('mouseleave', function(){
	    console.log('mouseleave');
	    me.mouse_in = false;
	    var new_balls = [];
	    Array.prototype.forEach.call(me.balls, function(b){
	        if(!b.hasOwnProperty('type')){
	            new_balls.push(b);
	        }
	    });
	    me.balls = new_balls.slice(0);
	});
	document.addEventListener('mousemove', function(e){
	    //console.log('mousemove - X:'+e.clientX+', Y:'+e.clientY);
	    //var e = e || window.event;
	    me.mouse_ball.x = e.clientX;
	    me.mouse_ball.y = e.clientY;
	});
  }


	// Random speed
	getRandomSpeed(pos){
	    var  min = -1,max = 1;
	    var arr = [];
	    switch(pos){
	        case 'top':
	            arr = [this.randomNumFrom(min, max), this.randomNumFrom(0.1, max)];
	            break;
	        case 'right':
	            arr = [this.randomNumFrom(min, -0.1), this.randomNumFrom(min, max)];
	            break;
	        case 'bottom':
	            arr = [this.randomNumFrom(min, max), this.randomNumFrom(min, -0.1)];
	            break;
	        case 'left':
	            arr = [this.randomNumFrom(0.1, max), this.randomNumFrom(min, max)];
	            break;
	        default:
	            arr = [0,0];
	            break;
	    }
	    return arr;
	};
	randomArrayItem(arr){
	    return arr[Math.floor(Math.random() * arr.length)];
	};
	randomNumFrom(min, max){
	    return Math.random()*(max - min) + min;
	};

	// Random Ball
	getRandomBall(){
	    var pos = this.randomArrayItem(['top', 'right', 'bottom', 'left']);
	    var obj = {};
	    switch(pos){
	        case 'top':
	            obj = {
	                x: this.randomSidePos(this.can_w),
	                y: -this.R,
	                vx: this.getRandomSpeed('top')[0],
	                vy: this.getRandomSpeed('top')[1],
	                r: this.R,
	                al: 1,
	                phase: this.randomNumFrom(0, 10)
	            }
	            break;
	        case 'right':
	            obj = {
	                x: this.can_w + this.R,
	                y: this.randomSidePos(this.can_h),
	                vx: this.getRandomSpeed('right')[0],
	                vy: this.getRandomSpeed('right')[1],
	                r: this.R,
	                al: 1,
	                phase: this.randomNumFrom(0, 10)
	            }
	            break;
	        case 'bottom':
	            obj = {
	                x: this.randomSidePos(this.can_w),
	                y: this.can_h + this.R,
	                vx: this.getRandomSpeed('bottom')[0],
	                vy: this.getRandomSpeed('bottom')[1],
	                r: this.R,
	                al: 1,
	                phase: this.randomNumFrom(0, 10)
	            }
	            break;
	        case 'left':
	            obj = {
	                x: -this.R,
	                y: this.randomSidePos(this.can_h),
	                vx: this.getRandomSpeed('left')[0],
	                vy: this.getRandomSpeed('left')[1],
	                r: this.R,
	                al: 1,
	                phase: this.randomNumFrom(0, 10)
	            }
	            break;
	    }
	    return obj;
	};
	randomSidePos(length){
	    return Math.ceil(Math.random() * length);
	};

	// Draw Ball
	renderBalls(){
		let me = this;
	    Array.prototype.forEach.call(this.balls, function(b){
	       if(!b.hasOwnProperty('type')){
	           me.ctx.fillStyle = 'rgba('+me.ball_color.r+','+me.ball_color.g+','+me.ball_color.b+','+b.al+')';
	           me.ctx.beginPath();
	           me.ctx.arc(b.x, b.y, me.R, 0, Math.PI*2, true);
	           me.ctx.closePath();
	           me.ctx.fill();
	       }
	    });
	};

	// Update balls
	updateBalls(){
		let me = this;
	    var new_balls = [];
	    Array.prototype.forEach.call(this.balls, function(b){
	        b.x += b.vx;
	        b.y += b.vy;
	        
	        if(b.x > -(50) && b.x < (me.can_w+50) && b.y > -(50) && b.y < (me.can_h+50)){
	           new_balls.push(b);
	        }
	        
	        // alpha change
	        b.phase += me.alpha_f;
	        b.al = Math.abs(Math.cos(b.phase));
	        // console.log(b.al);
	    });
	    
	    this.balls = new_balls.slice(0);
	};

	// Draw lines
	renderLines(){
	    var fraction, alp;
	    for (var i = 0; i < this.balls.length; i++) {
	        for (var j = i + 1; j < this.balls.length; j++) {
	           
	           fraction = this.getDisOf(this.balls[i], this.balls[j]) / this.dis_limit;
	            
	           if(fraction < 1){
	               alp = (1 - fraction).toString();

	               this.ctx.strokeStyle = 'rgba('+this.line_color.r+','+this.line_color.g+','+this.line_color.b+','+alp+')';
	               this.ctx.lineWidth = this.link_line_width;
	               
	               this.ctx.beginPath();
	               this.ctx.moveTo(this.balls[i].x, this.balls[i].y);
	               this.ctx.lineTo(this.balls[j].x, this.balls[j].y);
	               this.ctx.stroke();
	               this.ctx.closePath();
	           }
	        }
	    }
	};

	// calculate distance between two points
	getDisOf(b1, b2){
	    var  delta_x = Math.abs(b1.x - b2.x),
	       delta_y = Math.abs(b1.y - b2.y);
	    
	    return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
	};

	// add balls if there a little balls
	addBallIfy(){
	    if(this.balls.length < 40){
	        this.balls.push(this.getRandomBall());
	    }
	}

	// Render
	render(){

	    this.ctx.clearRect(0, 0, this.can_w, this.can_h);
	    
	    this.renderBalls();
	    
	    this.renderLines();
	    
	    this.updateBalls();
	    
	    this.addBallIfy();
	    
	    window.requestAnimationFrame(this.render.bind(this));
	};

	// Init Balls
	initBalls(num){
	    for(var i = 1; i <= num; i++){
	        this.balls.push({
	            x: this.randomSidePos(this.can_w),
	            y: this.randomSidePos(this.can_h),
	            vx: this.getRandomSpeed('top')[0],
	            vy: this.getRandomSpeed('top')[1],
	            r: this.R,
	            al: 1,
	            phase: this.randomNumFrom(0, 10)
	        });
	    }
	};

	// Init Canvas
	initCanvas(){
	    this.canvas.setAttribute('width', window.innerWidth);
	    this.canvas.setAttribute('height', window.innerHeight);
	    
	    this.can_w = parseInt(this.canvas.getAttribute('width'));
	    this.can_h = parseInt(this.canvas.getAttribute('height'));
	};
	onResize(e){
	    console.log('Window Resize...');
	    this.initCanvas();
	};

	goMovie(){
	    this.initCanvas();
	    this.initBalls(30);
	    window.requestAnimationFrame(this.render.bind(this));
	};


}
