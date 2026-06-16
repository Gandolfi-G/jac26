export type GroupId = "1" | "2" | "3" | "4";

export type PuzzleId =
  | "morse"
  | "runes"
  | "correspondance"
  | "lockee"
  | "what3words";

type Theme = {
  primary: string;
  light: string;
  dark: string;
};

type GroupConfig = {
  name: string;
  colorName: string;
  theme: Theme;
  puzzleOrder: PuzzleId[];
  answers: Record<PuzzleId, string>;
};

export type CorrespondanceRow = {
  name: string;
  place: string;
};

type PuzzleConfig = {
  morse: {
    title: string;
    type: "audio";
    description: string;
    instruction: string;
    introByGroup: Record<GroupId, string>;
    audioByGroup: Record<GroupId, string>;
    successMessage: string;
  };
  runes: {
    title: string;
    type: "runes";
    description: string;
    instruction: string;
    introByGroup: Record<GroupId, string>;
    imageByGroup: Record<GroupId, string>;
    textByGroup: Record<GroupId, string>;
    successMessage: string;
  };
  correspondance: {
    title: string;
    type: "table";
    description: string;
    instruction: string;
    introByGroup: Record<GroupId, string>;
    startNameByGroup: Record<GroupId, string>;
    tablesByGroup: Record<GroupId, CorrespondanceRow[]>;
    successMessage: string;
  };
  lockee: {
    title: string;
    type: "external-lock";
    description: string;
    instruction: string;
    introByGroup: Record<GroupId, string>;
    lockeeUrlsByGroup: Record<GroupId, string>;
    successMessage: string;
  };
  what3words: {
    title: string;
    type: "what3words";
    description: string;
    instruction: string;
    introByGroup: Record<GroupId, string>;
    linksByGroup: Record<GroupId, string>;
    successMessage: string;
  };
};

export const groupIds: GroupId[] = ["1", "2", "3", "4"];

export const puzzleLabels: Record<PuzzleId, string> = {
  morse: "Morse",
  runes: "Runes",
  correspondance: "Correspondances",
  lockee: "Lockee",
  what3words: "what3words",
};

const decoyCorrespondanceRows: CorrespondanceRow[] = [
  { name: "Alice", place: "Salle 101" },
  { name: "Baptiste", place: "Salle 102" },
  { name: "Camille", place: "Salle 103" },
  { name: "Dorian", place: "Salle 104" },
  { name: "Élise", place: "Salle 105" },
  { name: "Félix", place: "Salle 106" },
  { name: "Garance", place: "Salle 107" },
  { name: "Ibrahim", place: "Salle 108" },
  { name: "Juliette", place: "Salle 109" },
  { name: "Kylian", place: "Salle 110" },
  { name: "Maëlle", place: "Salle 112" },
  { name: "Nina", place: "Salle 113" },
  { name: "Oscar", place: "Salle 115" },
  { name: "Paul", place: "Salle 116" },
  { name: "Quentin", place: "Salle 117" },
  { name: "Romane", place: "Salle 118" },
  { name: "Sacha", place: "Salle 119" },
  { name: "Tom", place: "Salle 120" },
  { name: "Ulysse", place: "Salle 121" },
  { name: "Valentine", place: "Salle 122" },
  { name: "William", place: "Salle 123" },
  { name: "Yasmine", place: "Salle 124" },
  { name: "Anaïs", place: "Salle 125" },
  { name: "Bilel", place: "Salle 126" },
  { name: "Célia", place: "Salle 128" },
  { name: "Diego", place: "Salle 129" },
  { name: "Ethan", place: "Salle 130" },
  { name: "Fatou", place: "Salle 131" },
  { name: "Gabriel", place: "Salle 132" },
  { name: "Héloïse", place: "Salle 133" },
  { name: "Ismaël", place: "Salle 134" },
  { name: "Jeanne", place: "Salle 135" },
  { name: "Karim", place: "Salle 136" },
  { name: "Louise", place: "Salle 137" },
  { name: "Mathis", place: "Salle 138" },
  { name: "Nolan", place: "Salle 139" },
  { name: "Océane", place: "Salle 140" },
  { name: "Pierre", place: "Salle 141" },
  { name: "Rayan", place: "Salle 142" },
  { name: "Sofia", place: "Salle 143" },
  { name: "Théo", place: "Salle 144" },
  { name: "Violette", place: "Salle 145" },
  { name: "Wassim", place: "Salle 146" },
  { name: "Yaël", place: "Salle 147" },
  { name: "Axel", place: "Salle 148" },
  { name: "Brune", place: "Salle 149" },
  { name: "Côme", place: "Salle 150" },
  { name: "Daphné", place: "Salle 151" },
  { name: "Eliott", place: "Salle 152" },
  { name: "Flora", place: "Salle 153" },
];

function withDecoyRows(realRows: CorrespondanceRow[], offset = 0): CorrespondanceRow[] {
  const decoys = [
    ...decoyCorrespondanceRows.slice(offset),
    ...decoyCorrespondanceRows.slice(0, offset),
  ];
  const rows: CorrespondanceRow[] = [];
  let realIndex = 0;

  decoys.forEach((decoy, index) => {
    if (index % 4 === 0 && realIndex < realRows.length) {
      rows.push(realRows[realIndex]);
      realIndex += 1;
    }
    rows.push(decoy);
  });

  return [...rows, ...realRows.slice(realIndex)];
}

export const rallyeConfig: {
  groups: Record<GroupId, GroupConfig>;
  puzzles: PuzzleConfig;
} = {
  groups: {
    "1": {
      name: "Groupe 1",
      colorName: "bleu",
      theme: {
        primary: "#2563eb",
        light: "#dbeafe",
        dark: "#1e40af",
      },
      // Modifiez l'ordre ci-dessous pour changer le parcours du groupe.
      puzzleOrder: ["correspondance", "morse", "runes", "lockee", "what3words"],
      // Modifiez les réponses attendues ici. La validation ignore la casse et les accents.
      answers: {
        morse: "sixseven",
        runes: "regardons",
        correspondance: "foron",
        lockee: "nakamura",
        what3words: "mot1.mot2.mot3",
      },
    },

    "2": {
      name: "Groupe 2",
      colorName: "jaune",
      theme: {
        primary: "#eab308",
        light: "#fef9c3",
        dark: "#a16207",
      },
      puzzleOrder: ["correspondance", "lockee", "morse", "runes", "what3words"],
      answers: {
        morse: "luffy",
        runes: "regardons",
        correspondance: "cycle",
        lockee: "theodora",
        what3words: "mot1.mot2.mot3",
      },
    },

    "3": {
      name: "Groupe 3",
      colorName: "rouge",
      theme: {
        primary: "#dc2626",
        light: "#fee2e2",
        dark: "#991b1b",
      },
      puzzleOrder: ["correspondance", "runes", "morse", "lockee", "what3words"],
      answers: {
        morse: "naruto",
        runes: "regardons",
        correspondance: "neuvieme",
        lockee: "gims",
        what3words: "mot1.mot2.mot3",
      },
    },

    "4": {
      name: "Groupe 4",
      colorName: "violet",
      theme: {
        primary: "#7c3aed",
        light: "#ede9fe",
        dark: "#5b21b6",
      },
      puzzleOrder: ["correspondance", "lockee", "runes", "morse", "what3words"],
      answers: {
        morse: "foron",
        runes: "regardons",
        correspondance: "college",
        lockee: "maneskin",
        what3words: "mot1.mot2.mot3",
      },
    },
  },

  puzzles: {
    morse: {
      title: "Énigme du message sonore",
      type: "audio",
      description: "Écoutez le message en morse, puis entrez le mot décodé.",
      instruction:
        "Lancez l'audio, notez les sons courts et longs, puis transformez le message en mot.",
      // Message affiché au début de cette énigme selon le groupe.
      // Modifiez ces textes pour donner des consignes différentes à l'équipe qui se déplace.
      introByGroup: {
        "1": "Le groupe mobile doit trouver la zone pour décoder le morse. Énigme : quand la sonnerie libère les élèves, c'est là qu'ils vont prendre l'air, courir et discuter. Groupe 1 : écoutez le message sonore et transmettez uniquement le mot décodé.",
        "2": "Le groupe mobile doit trouver la zone pour décoder le morse. Énigme : quand la sonnerie libère les élèves, c'est là qu'ils vont prendre l'air, courir et discuter. Groupe 2 : installez-vous dans un endroit calme avant de lancer l'audio.",
        "3": "Le groupe mobile doit trouver la zone pour décoder le morse. Énigme : quand la sonnerie libère les élèves, c'est là qu'ils vont prendre l'air, courir et discuter. Groupe 3 : une personne écoute, les autres notent les sons courts et longs.",
        "4": "Le groupe mobile doit trouver la zone pour décoder le morse. Énigme : quand la sonnerie libère les élèves, c'est là qu'ils vont prendre l'air, courir et discuter. Groupe 4 : comparez vos notes avant de proposer la réponse.",
      },
      // Les chemins doivent rester relatifs et ne jamais commencer par "/".
      audioByGroup: {
        "1": "assets/audio/morse_sixseven.wav",
        "2": "assets/audio/morse_luffy.wav",
        "3": "assets/audio/morse_naruto.wav",
        "4": "assets/audio/morse_foron.wav",
      },
      successMessage: "Message décodé. Vous pouvez continuer.",
    },

    runes: {
      title: "Énigme des runes",
      type: "runes",
      description: "",
      instruction:
        "Observez l'image et utilisez l'objet récupéré dans le casier pour décoder le mot.",
      introByGroup: {
        "1": "Le groupe mobile doit se retrouver en salle 127 pour aider à décoder. Le morse est réussi : le groupe mobile doit aller à la bibliothèque récupérer un objet. Phrase à dire à la bibliothécaire : \"Il paraît que vous avez des indices pour retrouver le trésor d'un ancien directeur, peut-on le voir ?\" Ensuite, décrivez ce mot crypté à l'équipe qui possède l'indice des runes.",
        "2": "Le groupe mobile doit se retrouver en salle 127 pour aider à décoder. Le morse est réussi : le groupe mobile doit aller à la bibliothèque récupérer un objet. Phrase à dire à la bibliothécaire : \"Il paraît que vous avez des indices pour retrouver le trésor d'un ancien directeur, peut-on le voir ?\" Ensuite, demandez l'aide d'un autre groupe pour associer les symboles aux lettres.",
        "3": "Le groupe mobile doit se retrouver en salle 127 pour aider à décoder. Groupe 3 : gardez l'image visible pendant que vous cherchez la correspondance.",
        "4": "Le groupe mobile doit se retrouver en salle 127 pour aider à décoder. Groupe 4 : notez chaque lettre trouvée avant de saisir le mot final.",
      },
      // Placez les images PNG dans public/assets/images/.
      // Les chemins doivent rester relatifs et ne jamais commencer par "/".
      imageByGroup: {
        "1": "assets/fonts/madeon.png",
        "2": "assets/fonts/madeon.png",
        "3": "assets/fonts/madeon.png",
        "4": "assets/fonts/madeon.png",
      },
      // Texte de secours si vous préférez ne pas utiliser d'image.
      textByGroup: {
        "1": "TEXTE_CODE_GROUPE_1",
        "2": "TEXTE_CODE_GROUPE_2",
        "3": "TEXTE_CODE_GROUPE_3",
        "4": "TEXTE_CODE_GROUPE_4",
      },
      successMessage: "Le texte a été correctement décodé.",
    },

    correspondance: {
      title: "Énigme des correspondances",
      type: "table",
      description:
        "Suivez la piste des témoins pour retrouver un mot caché par l'ancien directeur.",
      instruction:
        "Commencez avec le prénom de départ. À chaque lieu, relevez le prénom trouvé, puis utilisez votre tableau pour connaître le prochain endroit.",
      introByGroup: {
        "1": "L'ancien directeur ne notait jamais les lieux directement. Pour protéger son secret, il confiait chaque étape à un élève témoin. Suivez la chaîne des prénoms pour retrouver le lieu final et le mot caché.",
        "2": "L'ancien directeur ne notait jamais les lieux directement. Pour protéger son secret, il confiait chaque étape à un élève témoin. Suivez la chaîne des prénoms pour retrouver le lieu final et le mot caché.",
        "3": "L'ancien directeur ne notait jamais les lieux directement. Pour protéger son secret, il confiait chaque étape à un élève témoin. Suivez la chaîne des prénoms pour retrouver le lieu final et le mot caché.",
        "4": "L'ancien directeur ne notait jamais les lieux directement. Pour protéger son secret, il confiait chaque étape à un élève témoin. Suivez la chaîne des prénoms pour retrouver le lieu final et le mot caché.",
      },
      startNameByGroup: {
        "1": "Adam",
        "2": "Zoé",
        "3": "Jade",
        "4": "Eva",
      },
      tablesByGroup: {
        "1": withDecoyRows([
          { name: "Sarah", place: "Salle 333" },
          { name: "Hugo", place: "Cafétéria" },
          { name: "Noé", place: "Salle des doyens" },
          { name: "Adam", place: "Salle des maîtres" },
          { name: "Manon", place: "Toilettes au troisième étage" },
          { name: "Emma", place: "Salle 112" },
          { name: "Malik", place: "Aula" },
          { name: "Léa", place: "Salle 209" },
          { name: "Clara", place: "Infirmerie" },
          { name: "Nathan", place: "Salle 114" },
          { name: "Lola", place: "Casier 184" },
          { name: "Lucas", place: "Escalier au deuxième étage" },
          { name: "Inès", place: "Salle 333" },
          { name: "Yanis", place: "Salle 308" },
        ], 0),
        "2": withDecoyRows([
          { name: "Manon", place: "Toilettes au troisième étage" },
          { name: "Emma", place: "Salle des doyens" },
          { name: "Clara", place: "Cafétéria" },
          { name: "Zoé", place: "Salle 333" },
          { name: "Malik", place: "Salle des maîtres" },
          { name: "Yanis", place: "Salle 333" },
          { name: "Sarah", place: "Escaliers au -1" },
          { name: "Lucas", place: "Infirmerie" },
          { name: "Lola", place: "Aula" },
          { name: "Nathan", place: "Salle 114" },
          { name: "Léa", place: "Salle 112" },
          { name: "Inès", place: "Casier 118" },
          { name: "Noé", place: "Salle 209" },
          { name: "Hugo", place: "Salle 308" },
        ], 13),
        "3": withDecoyRows([
          { name: "Sarah", place: "Escaliers au -1" },
          { name: "Emma", place: "Salle 114" },
          { name: "Hugo", place: "Cafétéria" },
          { name: "Jade", place: "Escalier au deuxième étage" },
          { name: "Clara", place: "Infirmerie" },
          { name: "Lucas", place: "Salle 112" },
          { name: "Nathan", place: "Casier 185" },
          { name: "Lola", place: "Aula" },
          { name: "Yanis", place: "Salle 308" },
          { name: "Noé", place: "Salle des doyens" },
          { name: "Malik", place: "Salle des maîtres" },
          { name: "Manon", place: "Toilettes au troisième étage" },
          { name: "Léa", place: "Salle 209" },
          { name: "Inès", place: "Salle 333" },
        ], 26),
        "4": withDecoyRows([
          { name: "Hugo", place: "Salle 209" },
          { name: "Sarah", place: "Salle 114" },
          { name: "Eva", place: "Infirmerie" },
          { name: "Léa", place: "Salle 333" },
          { name: "Noé", place: "Salle 112" },
          { name: "Lola", place: "Salle des doyens" },
          { name: "Yanis", place: "Aula" },
          { name: "Inès", place: "Escaliers au -1" },
          { name: "Manon", place: "Casier 186" },
          { name: "Emma", place: "Cafétéria" },
          { name: "Clara", place: "Salle des maîtres" },
          { name: "Malik", place: "Salle 308" },
          { name: "Nathan", place: "Escalier au deuxième étage" },
          { name: "Lucas", place: "Toilettes au troisième étage" },
        ], 37),
      },
      successMessage: "La correspondance est correcte.",
    },

    lockee: {
      title: "Énigme du cadenas de couleurs",
      type: "external-lock",
      description: "Résolvez l'énigme, puis ouvrez le cadenas Lockee.",
      instruction:
        "Ouvrez le cadenas de votre groupe. Quand il est validé, revenez ici et saisissez le mot affiché.",
      introByGroup: {
        "1": "Animaux de départ, dans l'ordre :\nCheval\nRenard\nHibou\nTortue\nDauphin\nLion\nLapin",
        "2": "Animaux de départ, dans l'ordre :\nHibou\nLapin\nCheval\nRenard\nDauphin\nLion\nTortue",
        "3": "Le morse est réussi : le groupe mobile doit aller à la bibliothèque récupérer un objet.\n\nPhrase à dire à la bibliothécaire : \"Il paraît que vous avez des indices pour retrouver le trésor d'un ancien directeur, peut-on le voir ?\"\n\nAnimaux de départ, dans l'ordre :\nDauphin\nLapin\nLion\nHibou\nTortue\nRenard\nCheval",
        "4": "Animaux de départ, dans l'ordre :\nRenard\nLapin\nLion\nHibou\nDauphin\nCheval\nCorbeau",
      },
      lockeeUrlsByGroup: {
        "1": "https://lockee.fr/o/5Lcorhyc",
        "2": "https://lockee.fr/o/IfjQR6Qb",
        "3": "https://lockee.fr/o/rcdZWGGF",
        "4": "https://lockee.fr/o/Kfv9KuqO",
      },
      successMessage: "Le cadenas est ouvert.",
    },

    what3words: {
      title: "Énigme des trois mots",
      type: "what3words",
      description: "",
      instruction:
        "Résolvez l'énigme du puzzle pour trouver le dernier mot.",
      introByGroup: {
        "1": "Le premier mot a été trouvé avec les cadenas : TRICOTONS. Le deuxième mot a été trouvé avec l'énigme des runes : REGARDONS. Il reste à trouver le dernier mot en résolvant l'énigme du puzzle.",
        "2": "Le premier mot a été trouvé avec les cadenas : TRICOTONS. Le deuxième mot a été trouvé avec l'énigme des runes : REGARDONS. Il reste à trouver le dernier mot en résolvant l'énigme du puzzle.",
        "3": "Le premier mot a été trouvé avec les cadenas : TRICOTONS. Le deuxième mot a été trouvé avec l'énigme des runes : REGARDONS. Il reste à trouver le dernier mot en résolvant l'énigme du puzzle.",
        "4": "Le morse est réussi : le groupe mobile doit aller à la bibliothèque récupérer un objet. Phrase à dire à la bibliothécaire : \"Il paraît que vous avez des indices pour retrouver le trésor d'un ancien directeur, peut-on le voir ?\" Le premier mot a été trouvé avec les cadenas : TRICOTONS. Le deuxième mot a été trouvé avec l'énigme des runes : REGARDONS. Il reste à trouver le dernier mot en résolvant l'énigme du puzzle.",
      },
      linksByGroup: {
        "1": "https://what3words.com/",
        "2": "https://what3words.com/",
        "3": "https://what3words.com/",
        "4": "https://what3words.com/",
      },
      successMessage: "Les trois mots sont corrects.",
    },
  },
};
