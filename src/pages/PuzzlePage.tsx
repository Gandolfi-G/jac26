import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GroupId, PuzzleId, rallyeConfig } from "../data/rallye.config";
import { useRallyeProgress } from "../hooks/useRallyeProgress";
import { answersMatch } from "../utils/normalizeAnswer";
import AnswerForm from "../components/AnswerForm";
import CorrespondancePuzzle from "../components/CorrespondancePuzzle";
import LockeePuzzle from "../components/LockeePuzzle";
import MorsePuzzle from "../components/MorsePuzzle";
import ProgressBar from "../components/ProgressBar";
import RunesPuzzle from "../components/RunesPuzzle";
import What3WordsPuzzle from "../components/What3WordsPuzzle";

function isGroupId(value: string | undefined): value is GroupId {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

export default function PuzzlePage() {
  const params = useParams();
  const navigate = useNavigate();
  const groupId = isGroupId(params.groupId) ? params.groupId : null;
  const { currentPuzzleId, currentPuzzleIndex, completePuzzle, isFinished, progress, selectGroup } =
    useRallyeProgress();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showLibraryModal, setShowLibraryModal] = useState(false);

  useEffect(() => {
    setFeedback(null);
  }, [currentPuzzleId]);

  useEffect(() => {
    if (groupId) {
      selectGroup(groupId);
    }
  }, [groupId, selectGroup]);

  if (!groupId) {
    return <Navigate to="/" replace />;
  }

  if (isFinished) {
    return <Navigate to={`/groupe/${groupId}/fin`} replace />;
  }

  if (!currentPuzzleId) {
    return null;
  }

  const group = rallyeConfig.groups[groupId];
  const puzzle = rallyeConfig.puzzles[currentPuzzleId];
  const expectedAnswer = group.answers[currentPuzzleId];
  const isWhat3Words = currentPuzzleId === "what3words";
  const libraryInstruction =
    "Le groupe mobile doit aller à la bibliothèque récupérer un objet. Phrase à dire à la bibliothécaire : \"Il paraît que vous avez des indices pour retrouver le trésor d'un ancien directeur, peut-on le voir ?\"";

  function renderPuzzle(puzzleId: PuzzleId, activeGroupId: GroupId) {
    switch (puzzleId) {
      case "morse":
        return <MorsePuzzle groupId={activeGroupId} />;
      case "runes":
        return <RunesPuzzle groupId={activeGroupId} />;
      case "correspondance":
        return <CorrespondancePuzzle groupId={activeGroupId} />;
      case "lockee":
        return <LockeePuzzle groupId={activeGroupId} />;
      case "what3words":
        return <What3WordsPuzzle groupId={activeGroupId} />;
      default:
        return null;
    }
  }

  function finishPuzzle(puzzleId: PuzzleId) {
    completePuzzle(puzzleId);

    window.setTimeout(() => {
      const nextCompletedCount = progress.completedPuzzleIds.includes(puzzleId)
        ? progress.completedPuzzleIds.length
        : progress.completedPuzzleIds.length + 1;

      if (nextCompletedCount >= group.puzzleOrder.length) {
        navigate(`/groupe/${groupId}/fin`);
      }
    }, 450);
  }

  function handleSubmit(answer: string) {
    if (!currentPuzzleId) {
      return;
    }

    if (!answersMatch(expectedAnswer, answer, isWhat3Words)) {
      setFeedback("Réponse incorrecte. Vérifiez vos indices puis réessayez.");
      return;
    }

    setFeedback(puzzle.successMessage);
    if (currentPuzzleId === "morse") {
      setShowLibraryModal(true);
      return;
    }

    finishPuzzle(currentPuzzleId);
  }

  function confirmLibraryDeparture() {
    setShowLibraryModal(false);
    finishPuzzle("morse");
  }

  return (
    <main className="content">
      <ProgressBar
        current={currentPuzzleIndex + 1}
        total={group.puzzleOrder.length}
        label={`Énigme ${currentPuzzleIndex + 1}/${group.puzzleOrder.length}`}
      />

      <article className="puzzle-panel">
        <div className="puzzle-heading">
          <span className="step-pill">Énigme {currentPuzzleIndex + 1}</span>
          <h2>{puzzle.title}</h2>
          {puzzle.description ? <p>{puzzle.description}</p> : null}
        </div>

        <section className="group-message" aria-label="Message pour le groupe">
          <strong>Message important</strong>
          <p>{puzzle.introByGroup[groupId]}</p>
        </section>

        {renderPuzzle(currentPuzzleId, groupId)}

        {!isWhat3Words ? (
          <AnswerForm
            label="Réponse"
            placeholder="Entrez votre réponse"
            onSubmit={handleSubmit}
            feedback={feedback}
            resetKey={currentPuzzleId}
          />
        ) : null}
      </article>

      {showLibraryModal ? (
        <div className="modal-backdrop" role="presentation">
          <section
            aria-labelledby="library-modal-title"
            aria-modal="true"
            className="library-modal"
            role="dialog"
          >
            <span className="step-pill">Mission importante</span>
            <h2 id="library-modal-title">Allez voir la bibliothécaire</h2>
            <p>{libraryInstruction}</p>
            <button className="primary-button" type="button" onClick={confirmLibraryDeparture}>
              Nous y allons
            </button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
