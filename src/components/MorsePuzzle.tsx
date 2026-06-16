import { GroupId, rallyeConfig } from "../data/rallye.config";
import { assetPath } from "../utils/assetPath";

type MorsePuzzleProps = {
  groupId: GroupId;
};

export default function MorsePuzzle({ groupId }: MorsePuzzleProps) {
  const puzzle = rallyeConfig.puzzles.morse;
  const audioPath = puzzle.audioByGroup[groupId];

  return (
    <section className="puzzle-content">
      <p>{puzzle.instruction}</p>
      <audio controls preload="none" src={assetPath(audioPath)}>
        Votre navigateur ne peut pas lire ce fichier audio.
      </audio>
    </section>
  );
}
