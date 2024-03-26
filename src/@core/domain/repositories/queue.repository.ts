import { Queue } from "../entities/queue.entity"
import { Song } from "../entities/song.entity"

/**
 * Interface for the queue repository.
 */
export interface IQueueRepository {
    create(queue: Queue): Promise<Queue>
    update(queue: Queue): Promise<Queue>
    delete(queue: Queue): Promise<void>
    findById(id: number): Promise<Queue>
    addSong(song: Song): Promise<Queue>
    removeSong(song: Song): Promise<Queue>
    clearSongs(): Promise<Queue>
    changeOrder(newOrder: number, song: Song): Promise<Queue>
}