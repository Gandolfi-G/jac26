import { Link, Navigate, useParams } from "react-router-dom";
import { GroupId } from "../data/rallye.config";
import { assetPath } from "../utils/assetPath";

const whippinMorse = [
  { letter: "W", code: ".--" },
  { letter: "H", code: "...." },
  { letter: "I", code: ".." },
  { letter: "P", code: ".--." },
  { letter: "P", code: ".--." },
  { letter: "I", code: ".." },
  { letter: "N", code: "-." },
];

function isGroupId(value: string | undefined): value is GroupId {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

export default function MorseHelpPage() {
  const params = useParams();
  const groupId = isGroupId(params.groupId) ? params.groupId : null;

  if (!groupId) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="content">
      <article className="puzzle-panel">
        <div className="puzzle-heading">
          <span className="step-pill">Aide</span>
          <h2>Décoder le Morse</h2>
          <p>Écoutez l'exemple, puis comparez le mot avec sa traduction en Morse.</p>
        </div>

        <section className="puzzle-content">
          <audio controls preload="none" src={assetPath("assets/audio/morse_WHIPPIN.wav")}>
            Votre navigateur ne peut pas lire ce fichier audio.
          </audio>

          <div className="morse-help-word" aria-label="Traduction du mot WHIPPIN en Morse">
            {whippinMorse.map((item, index) => (
              <div className="morse-help-letter" key={`${item.letter}-${index}`}>
                <strong>{item.letter}</strong>
                <span>{item.code}</span>
              </div>
            ))}
          </div>

          <p className="helper-text">
            WHIPPIN = .-- / .... / .. / .--. / .--. / .. / -.
          </p>

          <Link className="primary-button help-button" to={`/groupe/${groupId}/enigme`}>
            Retour à l'énigme
          </Link>
        </section>
      </article>
    </main>
  );
}
