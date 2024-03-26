import { Member } from "../entities/member.entity"
import { Party } from "../entities/party.entity"
import { User } from "../entities/user.entity"
import { Url } from "../value-objects/url.value-object"

/**
 * Interface for the party repository.
 */
export interface IPartyRepository {
    create(party: Party): Promise<Party>
    update(party: Party): Promise<Party>
    addMember(member: Member): Promise<Party>
    removeMember(member: Member): Promise<Party>
    findById(id: number): Promise<Party>
    findByInvite(invite: Url): Promise<Party>
    findByOwner(owner: User): Promise<Party[]>
    findByMember(member: Member): Promise<Party[]>
    findAll(): Promise<Party[]>
}