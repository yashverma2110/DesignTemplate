type columnActions = {
  call?: boolean;
};

export type columnsType = {
  header: string;
  key: string;
  columnActions?: columnActions;
};

export interface tableMetadata {
  title: string;
  columns: columnsType[];
}
