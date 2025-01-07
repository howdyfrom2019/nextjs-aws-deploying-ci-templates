/**
 * Server error response
 * @description Error response genereated by nestjs server
 */
interface ServerError {
  statusCode: number;
  message: string | string[];
}

/**
 * Pagination
 */
interface Pagination {
  page: number;
  size: number;
  sort?: string;
}

/**
 * List response
 */
interface ListResponse<T> {
  count: number;
  list: T[];
}
