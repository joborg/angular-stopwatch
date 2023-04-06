import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  startTime: Date;
  stopTime: Date;
  active: boolean = false
  paused: boolean = false
  timeTracked: number;
  get display() { return this.getTimeTracked(this.startTime, this.stopTime) }

  timer() {
    if (this.active && !this.paused) {
      this.stopTime = new Date()
      setTimeout(()=>{
        this.timer()
      }, 1000)
    }
  }

  start() {
    this.startTime = new Date()
    this.stopTime = this.stopTime
    this.timeTracked = 0;
    this.active = true
    this.timer()
  }

  pause() {
    this.paused = true
    this.stopTime = new Date()
    this.timeTracked = this.getTimeTracked(this.startTime, this.stopTime)
    console.log(this.timeTracked)
  }

  resume() {
    this.startTime = new Date(+new Date() - this.timeTracked)
    this.paused = false
    this.timer()
  }

  stop() {
    this.active = false
    if (!this.paused) this.stopTime = new Date()
    this.paused = false
    this.timeTracked = this.getTimeTracked(this.startTime, this.stopTime)
    console.log(this.timeTracked)
  }

  getTimeTracked( start, stop) {
    return (start && stop) ? +stop - +start : 0
  }

}
