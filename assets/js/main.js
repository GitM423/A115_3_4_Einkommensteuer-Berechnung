function checkYear() {
    if (document.getElementById("y2020").checked == true) {
        console.log("Jahr 2020 ausgewählt")
    }
    else if (document.getElementById("y2019").checked == true) {
        console.log("Jahr 2019 ausgewählt")
    }
    else if (document.getElementById("y2018").checked == true) {
        console.log("Jahr 2018 ausgewählt")
    }
    else if (document.getElementById("y2017").checked == true) {
        console.log("Jahr 2017 ausgewählt")
    }
    else if (document.getElementById("y2016").checked == true) {
        console.log("Jahr 2016 ausgewählt")
    }
    else if (document.getElementById("y2015").checked == true) {
        console.log("Jahr 2015 ausgewählt")
    }
}

function checkRate() {
    if (document.getElementById("base").checked == true) {
        console.log("1 Person (Grundtarif) ausgewählt")
        document.getElementById("person2").disabled = true
        document.getElementById("zvE-request").innerHTML = "Bitte das zu versteuernde Einkommen eintragen."
    }
    else if (document.getElementById("split").checked == true) {
        console.log("2 Personen (Splittingtarif) ausgewählt")
        document.getElementById("person2").disabled = false
        document.getElementById("zvE-request").innerHTML = "Bitte die zu versteuernden Einkommen eintragen."
    }
}

function checkESt() {
    // Abfrage, ob überhaupt eine Eingabe vorliegt (kann man weglassen dann wird allerdings bei einem leeren Feld 0 übergeben)
    if (document.getElementById("person1").value == "") {
        alert('\nWARNUNG! \n\nBitte ein zu versteuerndes Einkommen für Person 1 eintragen!')
    }
    else if (document.getElementById("split").checked == true && document.getElementById("person2").value == "") {
        alert('\nWARNUNG! \n\nBitte ein zu versteuerndes Einkommen für Person 2 eintragen oder auf Grundtarif wechseln!')
    }
    else {
        let zvE, ESt
        let limit1, limit2, limit3, limit4
        let c2a, c3a, c3c, c4, c5
        let c2b = 1400
        let c3b = 2397

        // Selection: Jahr
        if (document.getElementById("y2020").checked == true) {
            console.log("Jahr: \n\t2020")
            limit1 = 9408
            limit2 = 14532
            limit3 = 57051
            limit4 = 270500
            c2a = 972.87
            c3a = 212.02
            c3c = 972.79
            c4 = 8963.74
            c5 = 17078.74
        }
        else if (document.getElementById("y2019").checked == true) {
            console.log("Jahr: \n\t2019")
            limit1 = 9168
            limit2 = 14254
            limit3 = 55960
            limit4 = 265326
            c2a = 980.14
            c3a = 216.16
            c3c = 965.58
            c4 = 8780.90
            c5 = 16740.68
        }
        else if (document.getElementById("y2018").checked == true) {
            console.log("Jahr: \n\t2018")
            limit1 = 9000
            limit2 = 13996
            limit3 = 54949
            limit4 = 260532
            c2a = 997.80
            c3a = 220.13
            c3c = 948.49
            c4 = 8621.75
            c5 = 16437.70
        }
        else if (document.getElementById("y2017").checked == true) {
            console.log("Jahr: \n\t2017")
            limit1 = 8820
            limit2 = 13769
            limit3 = 54057
            limit4 = 256303
            c2a = 1007.27
            c3a = 223.76
            c3c = 939.57
            c4 = 8475.44
            c5 = 16164.53
        }
        else if (document.getElementById("y2016").checked == true) {
            console.log("Jahr: \n\t2016")
            limit1 = 8652
            limit2 = 13669
            limit3 = 53665
            limit4 = 254446
            c2a = 993.62
            c3a = 225.40
            c3c = 952.48
            c4 = 8394.14
            c5 = 16027.52
        }
        else if (document.getElementById("y2015").checked == true) {
            console.log("Jahr: \n\t2015")
            limit1 = 8472
            limit2 = 13469
            limit3 = 52881
            limit4 = 250730
            c2a = 997.60
            c3a = 228.74
            c3c = 948.68
            c4 = 8261.29
            c5 = 15783.19
        }

        // Selection: Grundtarif / Splittingtarif
        if (document.getElementById("base").checked == true) {
            zvE = Number(document.getElementById("person1").value)
            console.log("1 Person (Grundtarif): \n\tzvE = " + zvE + " €")
        }
        else if (document.getElementById("split").checked == true) {
            zvE = (Number(document.getElementById("person1").value) + Number(document.getElementById("person2").value)) / 2
            console.log("2 Personen(Splittingtarif): \n\tzvE = " + zvE + " €")
        }

        //  Berechnung: ESt
        if (zvE <= limit1) {
            ESt = 0
            console.log("Fall 1: \n\tESt= " + ESt + " €")
        }
        else if (zvE > limit1 && zvE <= limit2) { //zvE >= limit1 + 1 abgeändert um auch Werte zwischen "limit1" und "limit1 + 1" als Eingabe zu ermöglichen 
            let y = (zvE - limit1) / 10000
            ESt = (c2a * y + c2b) * y
            console.log("Fall 2: \n\tESt= " + ESt + " €")
        }
        else if (zvE > limit2 && zvE <= limit3) { //zvE >= limit2 + 1 abgeändert um auch Werte zwischen "limit2" und "limit2 + 1" als Eingabe zu ermöglichen 
            let z = (zvE - limit2) / 10000
            ESt = (c3a * z + c3b) * z + c3c
            console.log("Fall 3: \n\tESt= " + ESt + " €")
        }
        else if (zvE > limit3 && zvE <= limit4) { //zvE >= limit3 + 1 abgeändert um auch Werte zwischen "limit3" und "limit3 + 1" als Eingabe zu ermöglichen 
            ESt = 0.42 * zvE - c4
            console.log("Fall 4: \n\tESt= " + ESt + " €")
        }
        else if (zvE > limit4) { //zvE >= limit4 + 1 abgeändert um auch Werte zwischen "limit4" und "limit4 + 1" als Eingabe zu ermöglichen 
            ESt = 0.45 * zvE - c5
            console.log("Fall 5: \n\tESt= " + ESt + " €")
        }

        // Berechnung: korrekte Ausgabe zvE und ESt für 2 Personen
        if (document.getElementById("split").checked == true) {
            zvE *= 2
            ESt *= 2
        }

        // Ausgabe
        document.getElementById("result").innerHTML = `
        <p>zu versteuerndes Einkommen (zvE):</p>
        <i>${zvE.toFixed(2)}€</i>
        <p>Einkommensteuer (ESt):</p>
        <i>${(ESt).toFixed(2)}€</i>
        <p>Durchschnittssteuersatz:</p>
        <i>${((ESt / zvE) * 100).toFixed(2)}%</i>
        <p>result. Nettoeinkommen:</p>
        <i>${(zvE - ESt).toFixed(2)}€</i>`
    }
}

document.querySelectorAll('[type="number"]').forEach(function (item) {
    item.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            document.getElementById("check").click()
        }
    })
})
