export interface PaginationMetadata {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginationLinks {
  hasNext: boolean;
  hasPrevious?: boolean;
  next?: string;
  previous?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  metadata: PaginationMetadata;
  links: PaginationLinks;
}
