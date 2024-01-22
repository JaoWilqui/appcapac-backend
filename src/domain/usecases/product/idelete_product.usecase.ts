export interface IDeleteProductUsecase {
  deleteProduct(id: number): Promise<any>;
}
