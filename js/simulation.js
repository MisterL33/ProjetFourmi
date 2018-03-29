
class Simulation {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {
        $('#Reset').on('click', $.proxy(this.onBtnResetClick, this))
        $('input[type=radio]').on('change', $.proxy(this.onRadioChange, this))
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
}
