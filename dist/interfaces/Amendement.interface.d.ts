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
    listeDesSignataires: string;
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
    cosignatairesMentionLibre: AuteurInterface[] | null;
    place: string;
    numeroParent: string;
    auteurParent: string;
    ancreDivisionTexteVise: string;
    accordGouvernement: AccordGouvernementInterface;
}
export interface AccordGouvernementInterface {
    libelle: string | null;
    accord: null;
}
export interface Alinea {
    avantApres: string | null;
    numero: string | null;
}
export interface AuteurInterface {
    tribunId: string;
    civilite: string;
    nom: string;
    prenom: string;
    estGouvernement: string;
    estRapporteur: string;
    groupeTribunId: string;
    photoUrl: string;
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
