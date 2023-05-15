import { Uzivatel } from "./Uzivatel.js";

export class Zobrazeni {
    constructor(uloziste) {
        this.uloziste = uloziste;
        this.tabulka = document.querySelector("#klientiTabulka tbody");
        this.tlacitko = document.getElementById("submit");
        this.jmeno = document.getElementById("jmeno");
        this.prijmeni = document.getElementById("prijmeni");
        this.vek = document.getElementById("vek");
        this.telefon = document.getElementById("telefon");
        this.addEventListeners()
        this.showData();
    }

    addEventListeners() {
        this.tlacitko.addEventListener("click", () => {

            if(this.validateForm()) {
                this.AddData();
                this.showData();
                this.resetForm();
            }
        });
    }

    resetForm() {
        this.jmeno.value = '';
        this.prijmeni.value = '';
        this.vek.value = '';
        this.telefon.value = '';
    }

    showData() {
        this.uloziste.nacistZLocalStorage()
        let html = "";
        this.uloziste.peopleList.forEach((element, index) => {
            html += `
            <tr>
                <td>${element.jmeno}</td>
                <td>${element.prijmeni}</td>
                <td>${element.vek}</td>
                <td>${element.telefon}</td>
                <td><button onclick="zobrazeni.deleteData(${index})" class="btn btn-danger">Odstranit</button></td>
            </tr>
            `;
        });
        this.tabulka.innerHTML = html;
    }

    AddData() {
        this.uloziste.peopleList.push(
            new Uzivatel(jmeno.value, prijmeni.value, vek.value, telefon.value)
        );
        this.uloziste.ulozitDoLocalStorage()
    }

    validateForm() {
        if (this.jmeno.value == '') {
            alert("Je nutné zadat jméno");
            return false;
        }
        if (this.vek.value == "") {
            alert("Je nutné zadat věk.");
            return false;
        } else if (this.vek.value < 1) {
            alert("Věk nesmí být nula nebo menší jak nula.");
            return false;
        }
        if (this.prijmeni.value == '') {
            alert("Je nutné zadat příjmení.");
            return false;
        }
    
        if (this.telefon.value == '') {
            alert("Je nutné zadat telefon.");
            return false;
        }
    
        return true;
    }
}
