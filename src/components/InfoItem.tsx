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
  <p>
    <span className={`font-semibold ${labelClass}`}>{label}: </span>
    <span className={valueClass}>{value}</span>
  </p>
);
