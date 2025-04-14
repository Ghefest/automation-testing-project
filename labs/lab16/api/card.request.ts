export interface CreateCardRequest {
  name: string;
  idList: string;
}

export interface UpdateDueDateRequest {
  due: string | null;
}
