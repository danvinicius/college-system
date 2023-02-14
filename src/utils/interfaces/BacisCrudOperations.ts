export default interface BasicCrudOperations<T> {

        getAll(): Promise<T[] | null>;
        getById(id: any): Promise<T | null>;
        create(data: T): Promise<T | null>;
        update(id: any, data: any): Promise<T | null>;
        delete(id: any): Promise<T | null>;
}