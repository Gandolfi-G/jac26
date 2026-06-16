type ProgressBarProps = {
  current: number;
  total: number;
  label: string;
};

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <section className="progress-block" aria-label="Progression">
      <div className="progress-header">
        <strong>{label}</strong>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
    </section>
  );
}
