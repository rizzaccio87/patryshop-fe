export interface Action {
  label: string;
  type: 'create' | 'update' | 'remove';
}
