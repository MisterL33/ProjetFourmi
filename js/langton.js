/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern()
        this.Simulation = new Simulation()
    }
    RegisterOnReady() {
        this.Pattern.RegisterOnReady()
        this.Simulation.RegisterOnReady()

        $($.proxy(this.onReady, this))
    }
    onReady() {
        this.Grid = new Grid("Grid", this.Simulation.Size)
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY)
        this.displayAntInfo()

        $(this.Simulation).on('reset',$.proxy(this.onResetClick,this))

        console.log(this.Ant)
        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))
        $('#MoveForward').on("click", $.proxy(this.avancerFourmi, this))

        console.log("Langton.onReady")
    }
    displayAntInfo() {
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color)
        $('.ant-x').text(this.Ant.X)
        $('.ant-y').text(this.Ant.Y)
        $('.ant-direction').text(this.Ant.Direction)
        $('.ant-nb-steps').text(this.Ant.NbSteps)
    }
    onResetClick(e){
        this.Grid.Size=this.Simulation.Size
        this.Ant.Reset(this.Grid.MiddleX,this.Grid.MiddleY)
    }

    avancerFourmi(){
      // on set les infos
      let caseColor = this.Grid.GetColor(this.Ant.X, this.Ant.Y)
      let turn = this.Ant.Direction
      let nbSteps = $('#NbSteps').val()
      console.log(caseColor)
      if(caseColor === '#FFFFFF'){
         this.Grid.SetColor(this.Ant.X, this.Ant.Y, '#000000')
         this.Ant.TurnRight()
      }
      if(caseColor === '#000000'){
         this.Grid.SetColor(this.Ant.X, this.Ant.Y, '##FFFFFF')
         this.Ant.TurnLeft()
      }


      console.log('izi')
    }

}

let langton = new Langton()
langton.RegisterOnReady()
