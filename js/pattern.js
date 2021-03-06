
class Pattern {

    constructor() {
        this.allPatternData = null
        this.selectedPatternData = null
        this.controleDispoColor = true
        this.jsonFromHtml = null
    }
    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }
    onReady() {

        console.log("Pattern.onReady")
        // chargement des pattern

        $('#Pattern').on('change', $.proxy(this.onPatternChange, this))
        $('tbody').on('change', '.then-color > select', $.proxy(this.onColorChange, this))

        $.ajax({
            type: "GET",
            url: "https://api.myjson.com/bins/crrrn",
            dataType: "json",
            success: function (data) {
                Pattern.populatePattern(data)
                Pattern.getStepByName($('#Pattern').val())
                this.allPaternData = data.pattterns
                this.selectedPatternData = data.patterns[0]
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

    static getStepByName(name) {
        let siCouleur = null
        let thenColor = null
        let thenDirection = null
        let actualRowValue = null
        let obj = []
        Pattern.jsonFromHtml = []

        $.ajax({
            type: "GET",
            url: "https://api.myjson.com/bins/crrrn",
            dataType: "json",
            success: function (data) {
                $('tbody').empty()


                $.each(data.patterns, function (key, value) {
                    if (value.name === name) {
                        Pattern.selectedPatternData = value
                        $.each(value.steps, function (key, value2) {
                            let html = Pattern.GetHtmlRow(value2)
                            $('tbody').append(html)
                            var tbl = $(html).get().map(function (row) {
                                return $(row).find('td').get().map(function (cell) {
                                    if ($(cell).parent().attr("data-if-color")) {
                                        siCouleur = $(cell).parent().attr("data-if-color")
                                    }
                                    if ($(cell).hasClass("then-color")) {
                                        thenColor = $(cell).find(":selected").val();
                                    }
                                    if ($(cell).hasClass("then-direction")) {
                                        thenDirection = $(cell).find(":selected").val();
                                    }

                                    return $(cell).html();
                                });
                            });

                            obj.push({ 'if': siCouleur, 'then': { 'color': thenColor, 'direction': thenDirection } })

                        })
                    }
                })
                Pattern.jsonFromHtml = obj

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

    onPatternChange(e) {
        $(this).trigger('reset')
        Pattern.getStepByName($(e.currentTarget).val())

    }



    onColorChange(e) {
        $(e.currentTarget).parent('td').parent('tr').nextAll('tr').each($.proxy(this.ClearRow, this))
        $(e.currentTarget).parent('td').parent('tr').prevAll('tr').each($.proxy(function (i, f) { this.checkIfColorAvalaible(i, f, e.currentTarget) }, this))

        if (!this.controleDispoColor) {
            alert('couleur déja utilisé')
            $(e.currentTarget).val('#FFFFFF')
        }

        if ($(e.currentTarget).val() != '#FFFFFF') {
            let jsonObj = { "if": $(e.currentTarget).val() }
            $('tbody').append(Pattern.GetHtmlRow(jsonObj))

        }
    }

    ClearRow(i, e) {
        $(e).remove()
    }

    checkIfColorAvalaible(i, e, parent) {
        if ($(e).children('.then-color').children('select').val() == $(parent).val()) {
            this.controleDispoColor = false
        }
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
