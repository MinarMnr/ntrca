class PaginationMetaModel {
  
  constructor() {
    this.total = 0;
    this.size = 10;
    this.totalPage = 0;
    this.currentPage = 0;
    this.previousPage = 0;
    this.nextPage = 0;
  }
  
  fromJson(data = {}) {
    let obj = new PaginationMetaModel();
    obj.total = data.total ?? 0;
    obj.size = data.size ?? 0;
    obj.totalPage = this.getTotalPage(data.total, data.size);
    obj.currentPage = data.currentPage ?? 0;
    obj.previousPage = data.previousPage ?? 0;
    obj.nextPage = data.nextPage ?? 0;
    return obj;
  }
  
  getTotalPage(total, size) {
    if (total > 0 && size > 0) {
      return Math.ceil(total / size);
    }
    return 1;
  }
  
}

export const PaginationMeta = new PaginationMetaModel();