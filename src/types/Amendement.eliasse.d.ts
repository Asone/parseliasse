export interface AmendementEliasse {
    amendements: Amendement[];
}

export interface Amendement {
    numero:                    string;
    numeroLong:                string;
    numeroReference:           string;
    placeReference:            string;
    etat:                      string;
    dispositif:                string;
    exposeSommaire:            string;
    listeDESSignataires:       string;
    sortEnSeance:              string;
    bibard:                    string;
    bibardSuffixe:             string;
    legislature:               string;
    organeAbrv:                string;
    division:                  Division;
    alinea:                    Alinea;
    texte:                     Texte;
    position:                  string;
    urlPDF:                    string;
    auteur:                    Auteur;
    cosignataires:             Auteur[];
    cosignatairesMentionLibre: null;
    place:                     string;
    numeroParent:              string;
    auteurParent:              string;
    ancreDivisionTexteVise:    string;
    accordGouvernement:        AccordGouvernement;
}

export interface AccordGouvernement {
    libelle: string;
    accord:  null;
}

export interface Alinea {
    avantApres: string;
    numero: string;
}

export interface Auteur {
    tribunID:        string;
    civilite:        Civilite;
    nom:             string;
    prenom:          string;
    estGouvernement: string;
    estRapporteur:   string;
    groupeTribunID:  string;
    photoURL:        string;
    qualite:         null;
}

export enum Civilite {
    M = "M.",
    Mme = "Mme",
}

export interface Division {
    divisionDesignation:  string;
    type:                 string;
    avantApres:           string;
    titre:                string;
    urlDivisionTexteVise: string;
}

export interface Texte {
    titre:             string;
    titreCourt:        string;
    numBibard:         string;
    numeroLegislature: string;
}
