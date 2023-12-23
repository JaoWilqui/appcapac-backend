export class IPaginationDTO<T> {
  data?: T;
  pageIndex: number;
  totalPages?: number;
  pageSize: number;
}
