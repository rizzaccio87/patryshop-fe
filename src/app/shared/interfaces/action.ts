export interface Action {
  label: string;
  type: 'create' | 'view' | 'update' | 'remove';
}
