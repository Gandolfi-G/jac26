import { GroupId, rallyeConfig } from "../data/rallye.config";

type What3WordsPuzzleProps = {
  groupId: GroupId;
};

export default function What3WordsPuzzle({ groupId }: What3WordsPuzzleProps) {
  const puzzle = rallyeConfig.puzzles.what3words;
  const url = puzzle.linksByGroup[groupId];
  const isRealUrl = /^https?:\/\//i.test(url);

  return (
    <section className="puzzle-content">
      <p>{puzzle.instruction}</p>
      {isRealUrl ? (
        <a className="external-button" href={url} target="_blank" rel="noreferrer">
          Ouvrir what3words
        </a>
      ) : (
        <p className="placeholder-box">
          Remplacez <code>{url}</code> dans <code>src/data/rallye.config.ts</code>.
        </p>
      )}
    </section>
  );
}
