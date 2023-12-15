export interface TodoRepository<T> {
  insert(content: T): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  updateContent(id: number, content: T): Promise<void>;
  deleteById(id: number): Promise<void>;
}