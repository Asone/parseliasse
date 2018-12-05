export interface Discussion {
    amdtsParOrdreDeDiscussion: AmdtsParOrdreDeDiscussion;
}

export interface AmdtsParOrdreDeDiscussion {
    organe:           string;
    bibard:           string;
    bibardSuffixe:    string;
    legislature:      string;
    titre:            string;
    type:             string;
    divisions:        Division[];
    amendements:      Amendement[];
    amendementsByNum: null;
}

export interface Amendement {
    place:                            string;
    sort:                             Sort;
    numero:                           string;
    parentNumero:                     string;
    auteurLabel:                      string;
    auteurGroupe:                     AuteurGroupe;
    alineaLabel:                      string;
    missionLabel:                     string;
    discussionCommune:                string;
    discussionCommuneAmdtPositon:     DiscussionAmdtPositon;
    discussionCommuneSsAmdtPositon:   string;
    discussionIdentique:              string;
    discussionIdentiqueAmdtPositon:   DiscussionAmdtPositon;
    discussionIdentiqueSsAmdtPositon: DiscussionAmdtPositon;
    position:                         string;
}

export enum AuteurGroupe {
    Empty = "",
    Fi = "FI",
    Gdr = "GDR",
    LaREM = "LaREM",
    Lr = "LR",
    Lt = "LT",
    Modem = "MODEM",
    NI = "NI",
    Soc = "SOC",
    UdiAgir = "UDI-AGIR",
}

export enum DiscussionAmdtPositon {
    Debut = "debut",
    Empty = "",
    Fin = "fin",
    Milieu = "milieu",
}

export enum Sort {
    Adopté = "Adopté",
    Empty = "",
    NonSoutenu = "Non soutenu",
    Rejeté = "Rejeté",
    Retiré = "Retiré",
    Tombé = "Tombé",
}

export interface Division {
    place:       string;
    position:    string;
    amendements: null;
}
