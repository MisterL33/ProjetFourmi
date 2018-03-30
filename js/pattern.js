
class Pattern {
    constructor() {
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {

        console.log("Pattern.onReady")
        // chargement des pattern

        $('#Pattern').on('change',$.proxy(this.onPatternChange,this))
        $('tbody').on('change','.then-color > select',$.proxy(this.onColorChange,this))
        
        $.ajax({
            type: "GET",
            url: "https://api.myjson.com/bins/crrrn",
            dataType: "json",
            success: function (data) {
                Pattern.populatePattern(data)
                Pattern.getStepByName($('#Pattern').val())
            }
        })
    }

    static populatePattern(data) {
        $.each(data.patterns, function (key, value) {
            $('#Pattern').append($('<option>', {
                value: value.name,
                text: value.name
            }))
        })
    }

    static getStepByName(name){
        $.ajax({
            type: "GET",
            url: "https://api.myjson.com/bins/crrrn",
            dataType: "json",
            success: function (data) {
                $('tbody').empty()
                $.each(data.patterns, function (key, value) {
                    if(value.name===name){
                        $.each(value.steps,function(key,value2){
                            let html=Pattern.GetHtmlRow(value2)
                            $('tbody').append(html)
                        })
                    }
                })
            }
        })
    }

    static GetSelect(json, selected) {
        let html = '<select>'
        for (var property in json) {
            html += '<option value="' + property + '"'
            if (selected === property) {
                html += ' selected="selected"'
            }

            html += '>' + json[property] + '</option>'
        }

        html += '</select>'
        return html
    }

    static GetHtmlRow(step) {
        let settings = $.extend({
            if: "#FFFFFF",
            then: {
                color: "#FFFFFF",
                direction: "left"
            }
        }, step)

        let html = '<tr data-if-color="' + settings.if + '">'
        html += '<td class="if-color">' + PatternColor[settings.if] + '</td>'
        html += '<td class="then-color">' + Pattern.GetSelect(PatternColor, settings.then.color) + '</td>'
        html += '<td class="then-direction">' + Pattern.GetSelect(PatternDirection, settings.then.direction) + '</td>'
        html += '</tr>'
        return html
    }

    onPatternChange(e){
        $(this).trigger('reset')
        Pattern.getStepByName($(e.currentTarget).val())
    }

    onColorChange(e){
        console.log($(e.currentTarget).parent('td').parent('tr').nextAll('tr').each($.proxy(this.ClearRow, this)))
    }

    ClearRow(i, e) {
        $(e).empty()
    }
}

const PatternColor = Object.freeze({
    "#FFFFFF": "Blanc",
    "#6D9ECE": "Bleu Clair",
    "#1F5FA0": "Bleu Fonc&eacute;",
    "#6D071A": "Bordeaux",
    "#606060": "Gris",
    "#F0C300": "Jaune",
    "#000000": "Noir",
    "#FF7F00": "Orange",
    "#E0115F": "Rose",
    "#DB1702": "Rouge",
    "#008020": "Vert",
    "#7F00FF": "Violet"
})

const PatternDirection = Object.freeze({
    "left": "Gauche",
    "right": "Droite"
})
