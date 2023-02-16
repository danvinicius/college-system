interface BasicCrudOperations<T> {
        getAll(): Promise<T[] | null>
        getById(id: string): Promise<T | null>
        create(data: T): Promise<T | null>
        update(id: string, data: T): Promise<T | null>
        delete(id: string): Promise<T | null>
}

export default BasicCrudOperations;