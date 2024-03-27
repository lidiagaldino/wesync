import { Genre } from "../entities/genre.entity";

/**
 * Interface for the genre repository.
 */
export interface IGenreRepository {
    create(genre: Genre): Promise<Genre>;
    update(genre: Genre): Promise<Genre>;
    delete(genre: Genre): Promise<void>;
    findById(id: number): Promise<Genre>;
    findAll(): Promise<Genre[]>;
}