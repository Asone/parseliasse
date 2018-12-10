import { AuteurGroupeEnum, DiscussionEAmdtPositonEnum, SortEnum, PlaceEnum } from './Enums.interface';

export interface AmdtDerouleurInterface {
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
