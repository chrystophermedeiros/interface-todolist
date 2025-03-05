export const InfoItem = ({
  label,
  value,
  labelClass = "",
  valueClass = "",
}: {
  label: string;
  value: string | number | undefined;
  labelClass?: string;
  valueClass?: string;
}) => (
  <div className="max-w-full break-words">
    <span className={`font-semibold ${labelClass}`}>{label}: </span>
    <span className={valueClass}>{value}</span>
  </div>
);
