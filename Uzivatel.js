import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export class Uzivatel {

    constructor(jmeno, prijmeni, vek, telefon, id = uuidv4()) {
        this.id = id;
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.vek = vek;
        this.telefon = telefon;
    }
}