export interface List<I, P = ListProps> {
  content: I[];
  props: P;
}

export interface ListProps {
  currentPage: number,
  totalPages: number,
  countItems: number
}