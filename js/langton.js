/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />import { setInterval } from "timers";



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

        $('.condition').show();
        $(this.Simulation).on('reset', $.proxy(this.onResetClick, this))
        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this))
        $(this.Simulation).on('forward',$.proxy(this.avancerFourmi,this))
        $(this.Simulation).on('run',$.proxy(this.onRunClick,this))


        console.log("Langton.onReady")
    }
    displayAntInfo() {
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color)
        $('.ant-x').text(this.Ant.X)
        $('.ant-y').text(this.Ant.Y)
        $('.ant-direction').text(this.Ant.Direction)
        $('.ant-nb-steps').text(this.Ant.NbSteps)
    }
    onResetClick(e) {
        this.Grid.Size = this.Simulation.Size
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY)
    }


    avancerFourmi() {
        // on set les infos
        let caseColor = this.Grid.GetColor(this.Ant.X, this.Ant.Y)
        let turn = this.Ant.Direction
        let nbSteps = $('#NbSteps').val()

        for (let i = 0; i < nbSteps; i++) {
            caseColor = this.Grid.GetColor(this.Ant.X, this.Ant.Y)
            turn = this.Ant.Direction
            if (caseColor === '#FFFFFF') {
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, '#000000')
                this.Ant.TurnRight()
            }
            if (caseColor === '#000000') {
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, '#FFFFFF')
                this.Ant.TurnLeft()
            }
        }
    }

    onRunClick(e){
        let test = setInterval($.proxy(this.avancerFourmi,this), 100)
    }
}

let langton = new Langton()
langton.RegisterOnReady()
