import { AuteurGroupeEnum, SortEnum } from './Enums.interface';

export interface DiscussionInterface {
    amdtsParOrdreDeDiscussion: AmdtsParOrdreDeDiscussionInterface;
}

export interface AmdtsParOrdreDeDiscussionInterface {
    organe:           string;
    bibard:           number | string;
    bibardSuffixe:    string;
    legislature:      number | string;
    titre:            string;
    type:             string;
    divisions:        DivisionInterface[];
    amendements:      AmendementInterface[];
    amendementsByNum: null;
}

interface AmendementInterface {
    place:                            string;
    sort:                             string;
    numero:                           string;
    parentNumero:                     string;
    auteurLabel:                      string;
    auteurGroupe:                     string;
    alineaLabel:                      string;
    missionLabel:                     string;
    discussionCommune:                string;
    discussionCommuneAmdtPositon:     string;
    discussionCommuneSsAmdtPositon:   string;
    discussionIdentique:              string;
    discussionIdentiqueAmdtPositon:   string;
    discussionIdentiqueSsAmdtPositon: string;
    position:                         string;
}

export enum DiscussionAmdtPositonInterface {
    Debut = "debut",
    Empty = "",
    Fin = "fin",
    Milieu = "milieu",
}

interface DivisionInterface {
    place:       string;
    position:    string;
    amendements: null;
}
