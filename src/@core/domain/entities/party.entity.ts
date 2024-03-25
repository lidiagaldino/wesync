import { Guard } from '../shared/core/guard/guard.core';
import { Result } from '../shared/core/result/result.core';
import { Url } from '../value-objects/url.value-object';
import { Member } from './member.entity';
import { UserSong } from './user-song.entity';
import { User } from './user.entity';

export type TPartyProps = {
  name: string;
  owner: User;
  members: Member[];
  invite?: Url;
  queue: UserSong[];
  isPublic: boolean;
};

/**
 * A class that represents a Party.
 */
export class Party {
  private id: number;
  private props: TPartyProps;

  private constructor(props: TPartyProps) {
    this.props = props;
  }

  /**
   * Creates a new Party instance.
   * @param props - The properties of the new Party.
   * @returns A Result containing the new Party on success, or an error on failure.
   */
  public static create(props: TPartyProps): Result<Party> {
    const guardResults = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.name,
        argumentName: 'name',
      },
      {
        argument: props.owner,
        argumentName: 'owner',
      },
      {
        argument: props.members,
        argumentName: 'members',
      },
      {
        argument: props.queue,
        argumentName: 'queue',
      },
      {
        argument: props.isPublic,
        argumentName: 'isPublic',
      },
    ]);

    if (guardResults.isFailure) {
      return Result.fail(guardResults.getErrorValue());
    }
    return Result.ok(new Party(props));
  }

  /**
   * Returns the unique id of the party.
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Returns the name of the party.
   */
  public getName(): string {
    return this.props.name;
  }

  /**
   * Returns the owner of the party.
   */
  public getOwner(): User {
    return this.props.owner;
  }

  /**
   * Returns the members of the party.
   */
  public getMembers(): Member[] {
    return this.props.members;
  }

  /**
   * Returns the invite URL of the party, if any.
   */
  public getInvite(): Url | undefined {
    return this.props.invite;
  }

  /**
   * Returns the queue of songs for the party.
   */
  public getQueue(): UserSong[] {
    return this.props.queue;
  }

  /**
   * Returns the public status of the party.
   */
  public getIsPublic(): boolean {
    return this.props.isPublic;
  }

  /**
   * Sets the unique id of the party.
   * @param id - The unique id of the party.
   */
  public setId(id: number): void {
    this.id = id;
  }

  /**
   * Sets the name of the party.
   * @param name - The name of the party.
   */
  public setName(name: string): void {
    this.props.name = name;
  }

  /**
   * Sets the owner of the party.
   * @param owner - The new owner of the party.
   */
  public setOwner(owner: User): void {
    this.props.owner = owner;
  }

  /**
   * Sets the members of the party.
   * @param members - The new members of the party.
   */
  public setMembers(members: Member[]): void {
    this.props.members = members;
  }

  /**
   * Sets the invite URL of the party.
   * @param invite - The new invite URL of the party.
   */
  public setInvite(invite: Url): void {
    this.props.invite = invite;
  }

  /**
   * Sets the queue of songs for the party.
   * @param queue - The new queue of songs for the party.
   */
  public setQueue(queue: UserSong[]): void {
    this.props.queue = queue;
  }

  /**
   * Sets the public status of the party.
   * @param isPublic - The new public status of the party.
   */
  public setIsPublic(isPublic: boolean): void {
    this.props.isPublic = isPublic;
  }

  /**
   * Adds a song to the end of the party's queue.
   * @param song - The song to add to the queue.
   */
  public addSong(song: UserSong): void {
    this.props.queue.push(song);
  }

  /**
   * Removes a song from the party's queue.
   * @param song - The song to remove from the queue.
   */
  public removeSong(song: UserSong): void {
    this.props.queue = this.props.queue.filter(
      (s) => s.getId() !== song.getId(),
    );
  }

  /**
   * Toggles the public status of the party.
   */
  public toggleIsPublic(): void {
    this.props.isPublic = !this.props.isPublic;
  }

  /**
   * Adds a member to the party.
   * @param member - The member to add to the party.
   */
  public addMember(member: Member): void {
    this.props.members.push(member);
  }

  /**
   * Removes a member from the party.
   * @param member - The member to remove from the party.
   */
  public removeMember(member: Member): void {
    this.props.members = this.props.members.filter(
      (m) => m.getId() !== member.getId(),
    );
  }
}
