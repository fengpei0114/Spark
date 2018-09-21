import { Component,Input } from '@angular/core';

/*
 Generated class for the ProgressBar component.
 See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 for more info on Angular 2 Components.
 */
@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {
    @Input() totalSeconds:number;
    @Input() intervalSeconds:number;
    @Input() background:string;
    // @Output() onRefresh = new EventEmitter();
    // @Output() onFinish = new EventEmitter();

    // text: string;
    current: number;
    // step:number;

    constructor() {
        console.log('Hello ProgressBar Component');
        // this.text = 'Hello World';

    }
    ngAfterViewInit(){
        console.log('ionViewDidLoad')
        // this.step=(this.intervalSeconds*100)/this.totalSeconds;
        // console.log(this.totalSeconds);
        // console.log(this.intervalSeconds);
        // console.log(this.step);
        this.current = 0;
        // this.eachSecond();
    }
    // eachSecond(){
    //     let i = setInterval(()=>{
    //         console.log('interval');
    //         this.onRefresh.emit(this.current);
    //         if(Math.round(this.current + this.step)<100)
    //             this.current=Math.round(this.current + this.step);
    //         else{
    //             clearInterval(i);
    //             this.current=100;
    //             this.onFinish.emit(true);
    //         }
    //     },this.intervalSeconds*1000);
    // }

}
