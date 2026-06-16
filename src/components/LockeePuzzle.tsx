import { GroupId, rallyeConfig } from "../data/rallye.config";

type LockeePuzzleProps = {
  groupId: GroupId;
};

export default function LockeePuzzle({ groupId }: LockeePuzzleProps) {
  const puzzle = rallyeConfig.puzzles.lockee;
  const url = puzzle.lockeeUrlsByGroup[groupId];
  const isRealUrl = /^https?:\/\//i.test(url);
  const iframeUrl = url.includes("?") ? `${url}&nobg&noft` : `${url}?nobg&noft`;

  return (
    <section className="puzzle-content">
      <p>{puzzle.instruction}</p>
      {isRealUrl ? (
        <iframe
          className="lockee-frame"
          src={iframeUrl}
          title={`Cadenas Lockee du ${rallyeConfig.groups[groupId].name}`}
        />
      ) : (
        <p className="placeholder-box">
          Remplacez <code>{url}</code> dans <code>src/data/rallye.config.ts</code>.
        </p>
      )}
    </section>
  );
}
