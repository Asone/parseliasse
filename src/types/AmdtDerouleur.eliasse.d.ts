export interface AmdtDerouleur {
    place:                            Place;
    sort:                             Sort;
    numero:                           string;
    parentNumero:                     string;
    auteurLabel:                      string;
    auteurGroupe:                     AuteurGroupe;
    alineaLabel:                      string;
    missionLabel:                     string;
    discussionCommune:                string;
    discussionCommuneAmdtPositon:     DiscussionEAmdtPositon;
    discussionCommuneSsAmdtPositon:   string;
    discussionIdentique:              string;
    discussionIdentiqueAmdtPositon:   DiscussionEAmdtPositon;
    discussionIdentiqueSsAmdtPositon: string;
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

export enum DiscussionEAmdtPositon {
    Debut = "debut",
    Empty = "",
    Fin = "fin",
    Milieu = "milieu",
}

export enum Place {
    Article53 = "Article 53",
}

export enum Sort {
    Adopté = "Adopté",
    Empty = "",
    NonSoutenu = "Non soutenu",
    Rejeté = "Rejeté",
}