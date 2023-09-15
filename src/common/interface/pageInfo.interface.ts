export interface IPageInfo<T>{
    rows: T[],
    XTotal:	number,
    XTotalPages: number,
    XPerPage: number,
    XPage: number,
    XNextPage: number,
    XPrevPage: number,
}