type ButtonPropsType = {
  title: string;
  onClick?: () => void;
};

export function Button({ title, onClick }: ButtonPropsType) {
  return <button onClick={onClick}>{title}</button>;
}
