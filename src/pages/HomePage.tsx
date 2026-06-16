import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { groupIds, rallyeConfig } from "../data/rallye.config";
import { useRallyeProgress } from "../hooks/useRallyeProgress";

export default function HomePage() {
  const navigate = useNavigate();
  const { selectGroup } = useRallyeProgress();

  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <p className="kicker">Rallye scolaire</p>
        <h1 id="home-title">Le trésor du directeur</h1>
        <div className="story-intro">
          <p>
            Une rumeur circule dans l'établissement : un ancien directeur aurait caché
            un coffre rempli d'objets confisqués à des élèves au fil des années.
          </p>
          <p>
            Chaque groupe suit sa propre piste d'énigmes pour remonter jusqu'au lieu
            secret. Le groupe sera coupé en deux : une partie restera au QG, l'autre
            partie sera mobile pour explorer les lieux indiqués.
          </p>
          <p>
            Objectif final : trouver trois mots qui permettront de découvrir la clé
            qui ouvre le coffre-fort.
          </p>
        </div>
        <h2>Choisissez votre groupe</h2>
      </section>

      <section className="group-grid" aria-label="Groupes disponibles">
        {groupIds.map((groupId) => {
          const group = rallyeConfig.groups[groupId];

          return (
            <button
              className="group-card"
              key={groupId}
              onClick={() => {
                selectGroup(groupId);
                navigate(`/groupe/${groupId}/enigme`);
              }}
              style={{
                "--group-primary": group.theme.primary,
                "--group-light": group.theme.light,
                "--group-dark": group.theme.dark,
              } as CSSProperties}
            >
              <span className="group-number">Groupe {groupId}</span>
              <strong>{group.name}</strong>
              <span>Commencer le parcours</span>
            </button>
          );
        })}
      </section>
    </main>
  );
}
