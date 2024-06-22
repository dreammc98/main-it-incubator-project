type ButtonPropsType = {
  title: string;
};

export function Button({ title }: ButtonPropsType) {
  return <button>{title}</button>;
}
