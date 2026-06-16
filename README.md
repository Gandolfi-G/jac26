# Rallye Énigmes

Application web statique Vite + React + TypeScript pour un rallye scolaire avec 4 groupes.

Le site est prévu pour GitHub Pages : pas de backend, pas de base de données, pas d'API serveur, routes en `HashRouter`, et chemins d'assets compatibles avec un déploiement du type `https://mon-compte.github.io/rallye-enigmes/`.

## Installation

```bash
npm install
```

## Lancer le site en local

```bash
npm run dev
```

## Tester le build statique

```bash
npm run build
npm run preview
```

## Modifier le nom du dépôt GitHub

Dans `vite.config.ts`, modifiez la constante :

```ts
const repoName = "rallye-enigmes";
```

Si votre dépôt s'appelle autrement, remplacez `rallye-enigmes` par le nom exact du dépôt.

## Activer GitHub Pages

1. Allez dans les paramètres du dépôt GitHub.
2. Ouvrez `Pages`.
3. Dans `Source`, choisissez `GitHub Actions`.
4. Poussez sur la branche `main`.

Le workflow `.github/workflows/deploy.yml` construira le site et publiera le dossier `dist`.

## Modifier les réponses

Toutes les réponses se modifient dans :

```text
src/data/rallye.config.ts
```

Cherchez la section `answers` de chaque groupe.

## Modifier l'ordre des énigmes

Dans `src/data/rallye.config.ts`, modifiez `puzzleOrder` pour le groupe concerné.

Exemple :

```ts
puzzleOrder: ["morse", "runes", "correspondance", "lockee", "what3words"]
```

## Modifier le message affiché au début d'une énigme

Dans `src/data/rallye.config.ts`, chaque énigme contient un bloc `introByGroup`.

Exemple :

```ts
introByGroup: {
  "1": "Message affiché au groupe 1 au début de cette énigme.",
  "2": "Message affiché au groupe 2 au début de cette énigme.",
}
```

Utilisez ce champ pour donner des consignes différentes selon l'équipe qui reste sur le site ou celle qui se déplace.

## Placer les sons Morse

Placez les fichiers audio dans :

```text
public/assets/audio/
```

Les chemins indiqués dans la configuration doivent rester relatifs :

```ts
"assets/audio/groupe-1-morse.mp3"
```

N'utilisez pas de chemin qui commence par `/assets/...`.

## Placer la police Madeon Runes

Placez le fichier dans :

```text
public/assets/fonts/madeon-runes.woff2
```

La police est chargée par `src/utils/runeFont.ts` avec `import.meta.env.BASE_URL`, ce qui évite les chemins absolus incompatibles avec GitHub Pages.

## Placer les images Madeon Runes

Pour l'énigme Madeon Runes, vous pouvez utiliser une image PNG contenant le mot crypté.

Placez les images dans :

```text
public/assets/images/
```

Puis modifiez `imageByGroup` dans `src/data/rallye.config.ts`.

Exemple :

```ts
imageByGroup: {
  "1": "assets/images/groupe-1-runes.png",
}
```

## Modifier les liens Lockee

Dans `src/data/rallye.config.ts`, modifiez :

```ts
lockeeUrlsByGroup
```

Remplacez les valeurs `URL_LOCKEE_GROUPE_X` par les vraies URL.

## Modifier les liens what3words

Dans `src/data/rallye.config.ts`, modifiez :

```ts
linksByGroup
```

Remplacez les valeurs `URL_WHAT3WORDS_GROUPE_X` par les vraies URL.

## Réinitialiser la progression

Depuis l'interface :

- utilisez `Changer de groupe` pour revenir au choix du groupe ;
- utilisez `Recommencer` sur la page finale pour effacer uniquement la progression du groupe actuel.

Depuis le navigateur :

- ouvrez les outils de développement ;
- supprimez les clés `localStorage` qui commencent par `rallye-`.

## Sécurité des réponses

Important : dans un site statique GitHub Pages, les réponses ne sont pas réellement secrètes. Elles sont visibles dans le code source généré ou dans le dépôt GitHub.

C'est acceptable pour un rallye scolaire simple, mais il ne faut pas présenter ce système comme sécurisé.

Option possible : stocker des hash SHA-256 des réponses au lieu des réponses en clair, puis comparer le hash de la saisie. Cela masque les réponses directes, mais ne transforme pas le site statique en système sécurisé. La version actuelle garde les réponses en clair pour rester facilement modifiable par un professeur non développeur.

## Fichiers importants

- `src/data/rallye.config.ts` : groupes, couleurs, réponses, ordre des énigmes, consignes, liens et assets.
- `src/utils/assetPath.ts` : génération des chemins publics compatibles GitHub Pages.
- `src/utils/normalizeAnswer.ts` : validation sans casse, sans accents, et formats souples pour what3words.
- `src/hooks/useRallyeProgress.ts` : groupe choisi et progression sauvegardés dans `localStorage`.
