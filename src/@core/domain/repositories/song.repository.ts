import { Genre } from "../entities/genre.entity";
import { Song } from "../entities/song.entity";

/**
 * Interface for the song repository.
 */
export interface ISongRepository {
    create(song: Song): Promise<Song>
    update(song: Song): Promise<Song>
    delete(song: Song): Promise<void>
    findById(id: number): Promise<Song>
    findAll(): Promise<Song[]>
    findByGenre(genre: Genre): Promise<Song[]>
}