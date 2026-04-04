export interface PagingDTO {
  page: number;
  limit: number;
  search?: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
