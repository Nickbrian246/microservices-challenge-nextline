export interface ApiSuccessResponse<T> {
  data: T;
}
export interface ApiSuccessResponseWithMetaData<T, V> {
  data: T;
  meta: V;
}
