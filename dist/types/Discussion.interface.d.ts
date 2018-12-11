import { AuteurGroupeEnum, SortEnum } from './Enums.interface';
export interface DiscussionInterface {
    AmdtsParOrdreDeDiscussionInterface: AmdtsParOrdreDeDiscussionInterface;
}
export interface AmdtsParOrdreDeDiscussionInterface {
    organe: string;
    bibard: string;
    bibardSuffixe: string;
    legislature: string;
    titre: string;
    type: string;
    DivisionInterfaces: DivisionInterface[];
    amendements: AmendementInterface[];
    amendementsByNum: null;
}
export interface AmendementInterface {
    place: string;
    sort: SortEnum;
    numero: string;
    parentNumero: string;
    auteurLabel: string;
    auteurGroupe: AuteurGroupeEnum;
    alineaLabel: string;
    missionLabel: string;
    discussionCommune: string;
    discussionCommuneAmdtPositon: DiscussionAmdtPositonInterface;
    discussionCommuneSsAmdtPositon: string;
    discussionIdentique: string;
    discussionIdentiqueAmdtPositon: DiscussionAmdtPositonInterface;
    discussionIdentiqueSsAmdtPositon: DiscussionAmdtPositonInterface;
    position: string;
}
export declare enum DiscussionAmdtPositonInterface {
    Debut = "debut",
    Empty = "",
    Fin = "fin",
    Milieu = "milieu"
}
export interface DivisionInterface {
    place: string;
    position: string;
    amendements: null;
}
