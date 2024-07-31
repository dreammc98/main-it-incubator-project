type ButtonPropsType = {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function Button({ title, onClick, disabled, className }: ButtonPropsType) {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {title}
    </button>
  );
}
