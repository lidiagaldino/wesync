import { Member } from "../entities/member.entity"
import { Party } from "../entities/party.entity"
import { Email } from "../value-objects/email.value-object"

/**
 * Interface for the member repository.
 */
export interface IMemberRepository {
    create(member: Member): Promise<Member>
    update(member: Member): Promise<Member>
    delete(member: Member): Promise<void>
    findById(id: number): Promise<Member>
    findByEmail(email: Email): Promise<Member>
    findByParty(party: Party): Promise<Member[]>
}