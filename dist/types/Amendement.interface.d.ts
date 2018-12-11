import { CiviliteEnum } from './Enums.interface';
export interface AmendementsInterface {
    amendements: AmendementInterface[];
}
export interface AmendementInterface {
    numero: string;
    numeroLong: string;
    numeroReference: string;
    placeReference: string;
    etat: string;
    dispositif: string;
    exposeSommaire: string;
    listeDESSignataires: string;
    sortEnSeance: string;
    bibard: string;
    bibardSuffixe: string;
    legislature: string;
    organeAbrv: string;
    division: DivisionInterface;
    alinea: Alinea;
    texte: TexteInterface;
    position: string;
    urlPDF: string;
    auteur: AuteurInterface;
    cosignataires: AuteurInterface[];
    cosignatairesMentionLibre: null;
    place: string;
    numeroParent: string;
    auteurParent: string;
    ancreDivisionTexteVise: string;
    accordGouvernement: AccordGouvernementInterface;
}
export interface AccordGouvernementInterface {
    libelle: string;
    accord: null;
}
export interface Alinea {
    avantApres: string;
    numero: string;
}
export interface AuteurInterface {
    tribunID: string;
    civilite: CiviliteEnum;
    nom: string;
    prenom: string;
    estGouvernement: string;
    estRapporteur: string;
    groupeTribunID: string;
    photoURL: string;
    qualite: null;
}
export interface DivisionInterface {
    divisionDesignation: string;
    type: string;
    avantApres: string;
    titre: string;
    urlDivisionTexteVise: string;
}
export interface TexteInterface {
    titre: string;
    titreCourt: string;
    numBibard: string;
    numeroLegislature: string;
}
