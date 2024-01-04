export interface IDeleteCategoryUsecase {
  deleteCategory(id: number): Promise<any>;
}
