export interface BoardCell {
  id: string;
  value: number | string;
  flag: boolean;
  hasmine: boolean;
  open: boolean;
}
