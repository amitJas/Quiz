import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }
  
  
  public correctNum 
  public questions
  public answers:any
  public countQuestions =  0
  public question = null
  public ansuewrArr = []
  public numOfQustion =  0;
  public done = false
  public scor = 0
  public countCurrectAnswer = 0
  public userAnswer = null
  public FORWARD = true; BACKWARD = false
  public showScor = false
  public lastQuestionNotifier: Subject<void> = new Subject<void>()
 

  getQustion(index,direction){

    if(index == this.numOfQustion  ){
      
    }else{
      this.correctNum = Math.floor(Math.random() * 3)  
      this.question = this.questions[index].question
      this.answers = this.questions[index].incorrect_answers

      if(direction){ //if we are going forward 
        if(!this.ansuewrArr[index]) //we didn't set this qustion befor
            this.answers.splice(this.correctNum,0,this.questions[index].correct_answer)
      }
    }
    
  }

  navigatBackward(){
    this.countQuestions--
    this.getQustion(this.countQuestions,this.BACKWARD)
    this.checkIfSet()
  }
 

  navigatForward(){
    this.countQuestions++
    this.getQustion(this.countQuestions,this.FORWARD)
    this.checkIfSet()

    console.log('in set api => countQustions , numOfQustion',this.countQuestions,this.numOfQustion)
    if(this.countQuestions >= this.numOfQustion   ){
      this.done = true
      this.lastQuestionNotifier.next()
    }
  }

  checkIfSet(){
    if(this.ansuewrArr[this.countQuestions] )
        this.userAnswer = this.ansuewrArr[this.countQuestions].userAnsewr   
    else
      this.userAnswer = null
  }

  saveAnsuewr(radioNum){
    this.ansuewrArr = this.ansuewrArr.filter(item => item.questionNum != this.countQuestions)
    this.ansuewrArr.push({
      questionNum: this.countQuestions,
      userAnsewr: radioNum,
      correctAnswer: this.correctNum
    })
    if(radioNum == this.correctNum ){
      this.countCurrectAnswer++
    }
  }

  calculateScour(){
    this.scor = Math.round(this.countCurrectAnswer/this.numOfQustion) * 100 ; 
    return true
  }
  
}
