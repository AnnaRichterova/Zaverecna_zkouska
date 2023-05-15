export class Uloziste {
    constructor() {
        this.peopleList = []
        this.nacistZLocalStorage()
    }

    nacistZLocalStorage() {
        const storagePeopleList = localStorage.getItem("peopleList")
        if (!storagePeopleList) {
            this.peopleList = [];
        } else {
            this.peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }
    }

    ulozitDoLocalStorage() {
        const data = JSON.stringify(this.peopleList)
        localStorage.setItem("peopleList", data)
    }
}