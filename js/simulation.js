
class Simulation {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        $('#Reset').on('click', $.proxy(this.onBtnResetClick, this))
        $('input[type=radio]').on('change', $.proxy(this.onRadioChange, this))
        $('#Start').on('click',$.proxy(this.onRunClick,this))
        $('#MoveForward').on("click", $.proxy(this.onForwardClick, this))
        $('#Interval').on("change", $.proxy(this.onSelectChange, this))

        console.log("Simulation.onReady")
    }
    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }

    onBtnResetClick(e){
        $(this).trigger('reset')
    }

    onRadioChange(e){
        $(this).trigger('reset')
    }

    onForwardClick(e){
        $(this).trigger('forward')
    }

    onRunClick(e){
        $(this).trigger('run')
    }

    onSelectChange(e){
        let interval = $('#Interval').val()
        $(this).trigger('change', [{interval:interval}])
    }
}
