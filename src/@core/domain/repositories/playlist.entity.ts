import { Playlist } from "../entities/playlist.entity";
import { User } from "../entities/user.entity";

/**
 * Interface for the playlist repository.
 */
export interface IPlaylistRepository {
    create(playlist: Playlist): Promise<Playlist>;
    update(playlist: Playlist): Promise<Playlist>;
    delete(playlist: Playlist): Promise<void>
    findById(id: number): Promise<Playlist>
    findAll(): Promise<Playlist[]>
    findByUser(user: User): Promise<Playlist[]>
    findByName(name: string): Promise<Playlist[]>
}