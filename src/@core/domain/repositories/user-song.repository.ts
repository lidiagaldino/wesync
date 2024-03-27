import { Song } from "../entities/song.entity"
import { UserSong } from "../entities/user-song.entity"
import { User } from "../entities/user.entity"

/**
 * Interface for the user-song repository.
 */
export interface IUserSongRepository {
    create(userSong: UserSong): Promise<UserSong>
    update(userSong: UserSong): Promise<UserSong>
    delete(userSong: UserSong): Promise<void>
    findById(id: number): Promise<UserSong>
    findByUser(user: User): Promise<UserSong[]>
    findBySong(song: Song): Promise<UserSong[]>
    findAll(): Promise<UserSong[]>
    findByUserAndSong(user: User, song: Song): Promise<UserSong>
}