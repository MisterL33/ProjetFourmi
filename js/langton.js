/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />import { setInterval } from "timers";import { setTimeout } from "timers";





class Langton {

    constructor() {
        this.Pattern = new Pattern()
        this.Simulation = new Simulation()
        this.setIntervalVar = null
        this.fourmiSortie = false
        this.lancer = false
        
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
        $(this.Simulation).on('forward', $.proxy(this.avancerFourmi, this))
        $(this.Simulation).on('run', $.proxy(this.onRunClick, this))
        $(this.Simulation).on('stop', $.proxy(this.onStopClick, this))
        $(this.Simulation).on('change', $.proxy(this.onSelectChange, this))

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
        $('#Start').text('Demarrer')
        clearInterval(this.setIntervalVar);
        this.lancer=false
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

            if (this.Grid.GetColor(this.Ant.X, this.Ant.Y) === null && this.fourmiSortie === false) {
                alert('La fourmie est partie')
                this.fourmiSortie = true
            }
        }
    }

    onRunClick(e) {
        if(!this.lancer){
            let interval = $('#Interval').val()
            this.setIntervalVar = setInterval($.proxy(this.avancerFourmi, this), interval)
            $('#Start').text('Stop')
            this.lancer=true
        }else{
            $('#Start').text('Demarrer')
            clearInterval(this.setIntervalVar);
            this.lancer=false
        }
    }

    onSelectChange(e, data) {
        console.log(this.setInterval)
        if (this.setInterval !== undefined) {
            clearInterval(this.setIntervalVar);
            this.setInterval = setInterval($.proxy(this.avancerFourmi, this), data.interval)
        }
    }


 





}

let langton = new Langton()
langton.RegisterOnReady()
