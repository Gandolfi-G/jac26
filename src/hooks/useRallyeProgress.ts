import { useCallback, useMemo, useState } from "react";
import { GroupId, PuzzleId, rallyeConfig } from "../data/rallye.config";

const selectedGroupKey = "rallye-selected-group";
const progressKey = (groupId: GroupId) => `rallye-progress-group-${groupId}`;

type StoredProgress = {
  completedPuzzleIds: PuzzleId[];
};

function isGroupId(value: string | null): value is GroupId {
  return value === "1" || value === "2" || value === "3" || value === "4";
}

function readSelectedGroup(): GroupId | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(selectedGroupKey);
  return isGroupId(stored) ? stored : null;
}

function readProgress(groupId: GroupId | null): StoredProgress {
  if (!groupId || typeof window === "undefined") {
    return { completedPuzzleIds: [] };
  }

  try {
    const stored = window.localStorage.getItem(progressKey(groupId));
    if (!stored) {
      return { completedPuzzleIds: [] };
    }

    const parsed = JSON.parse(stored) as Partial<StoredProgress>;
    const allowed = new Set<PuzzleId>(rallyeConfig.groups[groupId].puzzleOrder);
    const completedPuzzleIds = (parsed.completedPuzzleIds ?? []).filter(
      (puzzleId): puzzleId is PuzzleId => allowed.has(puzzleId as PuzzleId),
    );

    return { completedPuzzleIds };
  } catch {
    return { completedPuzzleIds: [] };
  }
}

function saveProgress(groupId: GroupId, progress: StoredProgress): void {
  window.localStorage.setItem(progressKey(groupId), JSON.stringify(progress));
}

export function useRallyeProgress() {
  const [selectedGroupId, setSelectedGroupId] = useState<GroupId | null>(() =>
    readSelectedGroup(),
  );
  const [progress, setProgress] = useState<StoredProgress>(() =>
    readProgress(readSelectedGroup()),
  );

  const selectedGroup = selectedGroupId
    ? rallyeConfig.groups[selectedGroupId]
    : null;

  const selectGroup = useCallback((groupId: GroupId) => {
    window.localStorage.setItem(selectedGroupKey, groupId);
    setSelectedGroupId(groupId);
    setProgress(readProgress(groupId));
  }, []);

  const resetGroup = useCallback(() => {
    window.localStorage.removeItem(selectedGroupKey);
    setSelectedGroupId(null);
    setProgress({ completedPuzzleIds: [] });
  }, []);

  const resetProgress = useCallback(() => {
    if (!selectedGroupId) {
      return;
    }

    const emptyProgress = { completedPuzzleIds: [] };
    window.localStorage.setItem(progressKey(selectedGroupId), JSON.stringify(emptyProgress));
    setProgress(emptyProgress);
  }, [selectedGroupId]);

  const completePuzzle = useCallback(
    (puzzleId: PuzzleId) => {
      if (!selectedGroupId) {
        return;
      }

      setProgress((current) => {
        if (current.completedPuzzleIds.includes(puzzleId)) {
          return current;
        }

        const next = {
          completedPuzzleIds: [...current.completedPuzzleIds, puzzleId],
        };
        saveProgress(selectedGroupId, next);
        return next;
      });
    },
    [selectedGroupId],
  );

  const currentPuzzleIndex = useMemo(() => {
    if (!selectedGroup) {
      return 0;
    }

    return selectedGroup.puzzleOrder.findIndex(
      (puzzleId) => !progress.completedPuzzleIds.includes(puzzleId),
    );
  }, [progress.completedPuzzleIds, selectedGroup]);

  const isFinished = Boolean(selectedGroup && currentPuzzleIndex === -1);
  const currentPuzzleId = selectedGroup && !isFinished
    ? selectedGroup.puzzleOrder[currentPuzzleIndex]
    : null;

  return {
    selectedGroupId,
    selectedGroup,
    progress,
    currentPuzzleId,
    currentPuzzleIndex: isFinished ? selectedGroup?.puzzleOrder.length ?? 0 : currentPuzzleIndex,
    isFinished,
    selectGroup,
    resetGroup,
    resetProgress,
    completePuzzle,
  };
}
