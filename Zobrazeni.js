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
        this.editBtn = document.querySelector("#edit");
        this.stornoBtn = document.querySelector("#discard");
        this.init();
    }

    init() {
        this.addEventListenerToAddButton();
        this.showData();
        this.sortingButtonsSetup(".jmeno-svg", "jmeno");
        this.sortingButtonsSetup(".prijmeni-svg", "prijmeni");
        this.sortingButtonsSetup(".vek-svg", "vek");
    }

    addEventListenerToAddButton() {
        this.tlacitko.addEventListener("click", () => {
            if (this.validateForm()) {
                this.addData();
                this.showData();
                this.resetForm();
            }
        });
    }

    addEventListenerToUtilButtons() {
        document
            .querySelectorAll("button[data-element-id]")
            .forEach((button) => {
                button.addEventListener("click", (e) => {
                    this.deleteData(e.target.dataset.elementId);
                });
            });

        document.querySelectorAll("button[data-edit-id]").forEach((button) => {
            button.addEventListener("click", (e) => {
                this.editData(e.target.dataset.editId);
            });
        });
    }

    resetForm() {
        this.jmeno.value = "";
        this.prijmeni.value = "";
        this.vek.value = "";
        this.telefon.value = "";
    }

    showData() {
        this.uloziste.nacistZLocalStorage();
        let html = "";
        this.uloziste.peopleList.forEach((element) => {
            html += `
            <tr>
                <td>${element.jmeno}</td>
                <td>${element.prijmeni}</td>
                <td>${element.vek}</td>
                <td>${element.telefon}</td>
                <td><button data-element-id="${element.id}" class="btn btn-danger">Odstranit</button>
                <button data-edit-id="${element.id}" class="btn btn-warning">Upravit</button></td>
            </tr>
            `;
        });
        this.tabulka.innerHTML = html;
        this.addEventListenerToUtilButtons();
    }

    deleteData(index) {
        const objectToDelete = this.uloziste.peopleList.find(
            (uzivatel) => uzivatel.id === index
        );
        const indexOfObjectToDelete =
            this.uloziste.peopleList.indexOf(objectToDelete);
        this.uloziste.peopleList.splice(indexOfObjectToDelete, 1);
        this.uloziste.ulozitDoLocalStorage();
        this.showData();
    }

    addData() {
        this.uloziste.peopleList.push(
            new Uzivatel(
                this.jmeno.value,
                this.prijmeni.value,
                parseInt(this.vek.value),
                this.telefon.value
            )
        );
        this.uloziste.ulozitDoLocalStorage();
    }

    editData(index) {
        const objectToEdit = this.uloziste.peopleList.find((uzivatel) => {
            return uzivatel.id === index;
        });
        const indexOfObjectToEdit =
            this.uloziste.peopleList.indexOf(objectToEdit);
        this.showEditButtons()
        const idOfObjectToEdit = objectToEdit.id
        console.log(idOfObjectToEdit)
        this.resetForm()

        this.editBtn.addEventListener("click", () => {
            if (this.validateForm() === true) {
                this.uloziste.peopleList[indexOfObjectToEdit] = new Uzivatel(
                    this.jmeno.value,
                    this.prijmeni.value,
                    parseInt(this.vek.value),
                    this.telefon.value,
                    this.id = idOfObjectToEdit
                );
                this.hideEditButtons()
                this.uloziste.ulozitDoLocalStorage();
                this.showData();
            }
        });

        this.stornoBtn.addEventListener("click", () => {
            this.hideEditButtons()
            this.resetForm()
        });
    }

    hideEditButtons() {
        this.editBtn.classList.add("d-none");
        this.stornoBtn.classList.add("d-none");
        this.tlacitko.classList.remove("disabled")
    }

    showEditButtons() {
        this.editBtn.classList.remove("d-none");
        this.stornoBtn.classList.remove("d-none");
        this.tlacitko.classList.add("disabled");
    }

    validateForm() {
        if (this.jmeno.value == "") {
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
        if (this.prijmeni.value == "") {
            alert("Je nutné zadat příjmení.");
            return false;
        }

        if (this.telefon.value == "") {
            alert("Je nutné zadat telefon.");
            return false;
        }

        return true;
    }

    sortingButtonsSetup(element, property) {
        let order = "";
        document.querySelector(element).addEventListener("click", () => {
            if (order === "ascending" || order === undefined) {
                order = "descending";
                this.uloziste.peopleList.sort((a, b) => {
                    if (a[property] > b[property]) {
                        return -1;
                    } else if (a[property] < b[property]) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                this.uloziste.ulozitDoLocalStorage();
                this.showData();
            } else {
                order = "ascending";
                this.uloziste.peopleList.sort((a, b) => {
                    if (a[property] > b[property]) {
                        return 1;
                    } else if (a[property] < b[property]) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                this.uloziste.ulozitDoLocalStorage();
                this.showData();
            }
        });
    }
}
