import { GroupId, rallyeConfig } from "../data/rallye.config";

type CorrespondancePuzzleProps = {
  groupId: GroupId;
};

export default function CorrespondancePuzzle({ groupId }: CorrespondancePuzzleProps) {
  const puzzle = rallyeConfig.puzzles.correspondance;
  const rows = puzzle.tablesByGroup[groupId];
  const startName = puzzle.startNameByGroup[groupId];

  return (
    <section className="puzzle-content">
      <p>{puzzle.instruction}</p>
      <p>
        <strong>Prénom de départ :</strong> {startName}
      </p>
      <div className="table-wrapper">
        <table>
          <caption>Correspondances du {rallyeConfig.groups[groupId].name}</caption>
          <thead>
            <tr>
              <th scope="col">Prénom</th>
              <th scope="col">Lieu</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.name}-${row.place}`}>
                <td>{row.name}</td>
                <td>Aller à {row.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
