import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GroupId, rallyeConfig } from "../data/rallye.config";
import { useRallyeProgress } from "../hooks/useRallyeProgress";

function isGroupId(value: string | undefined): value is GroupId {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

export default function FinalPage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = isGroupId(params.groupId) ? params.groupId : null;
  const { resetProgress } = useRallyeProgress();

  if (!groupId) {
    return <Navigate to="/" replace />;
  }

  const group = rallyeConfig.groups[groupId];

  return (
    <main className="content final-page">
      <section className="final-panel">
        <span className="step-pill">Parcours terminé</span>
        <h2>Félicitations, {group.name} !</h2>
        <p>
          Le groupe {group.colorName} a terminé toutes les énigmes de son parcours.
        </p>
        <button
          className="primary-button"
          onClick={() => {
            resetProgress();
            navigate(`/groupe/${groupId}/enigme`);
          }}
        >
          Recommencer
        </button>
      </section>
    </main>
  );
}
