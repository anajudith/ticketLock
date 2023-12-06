export interface IProps {
  value: Date | null;
  setValue: (date: Date | null) => void;
  style?: object;
}
