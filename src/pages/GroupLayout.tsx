import type { CSSProperties } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { GroupId, rallyeConfig } from "../data/rallye.config";
import { useRallyeProgress } from "../hooks/useRallyeProgress";

function isGroupId(value: string | undefined): value is GroupId {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

export default function GroupLayout() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = isGroupId(params.groupId) ? params.groupId : null;
  const { selectedGroupId, selectGroup, resetGroup } = useRallyeProgress();

  useEffect(() => {
    if (groupId && selectedGroupId !== groupId) {
      selectGroup(groupId);
    }
  }, [groupId, selectGroup, selectedGroupId]);

  if (!groupId) {
    return <Navigate to="/" replace />;
  }

  const group = rallyeConfig.groups[groupId];

  return (
    <div
      className="app-shell"
      style={{
        "--theme-primary": group.theme.primary,
        "--theme-light": group.theme.light,
        "--theme-dark": group.theme.dark,
      } as CSSProperties}
    >
      <header className="topbar">
        <div>
          <span className="kicker">Parcours actif</span>
          <h1>{group.name}</h1>
        </div>
        <button
          className="ghost-button"
          onClick={() => {
            resetGroup();
            navigate("/");
          }}
        >
          Changer de groupe
        </button>
      </header>

      <Outlet />
    </div>
  );
}
