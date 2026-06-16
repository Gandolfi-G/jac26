import { GroupId, rallyeConfig } from "../data/rallye.config";
import { assetPath } from "../utils/assetPath";

type RunesPuzzleProps = {
  groupId: GroupId;
};

export default function RunesPuzzle({ groupId }: RunesPuzzleProps) {
  const puzzle = rallyeConfig.puzzles.runes;
  const imagePath = puzzle.imageByGroup[groupId];

  return (
    <section className="puzzle-content">
      <p>{puzzle.instruction}</p>
      {imagePath ? (
        <div className="rune-image-frame">
          <img
            className="rune-image"
            src={assetPath(imagePath)}
            alt={`Mot crypté en Madeon Runes pour le ${rallyeConfig.groups[groupId].name}`}
          />
        </div>
      ) : (
        <div className="rune-card" aria-label="Texte codé en runes">
          <p className="rune-text">{puzzle.textByGroup[groupId]}</p>
        </div>
      )}
    </section>
  );
}
