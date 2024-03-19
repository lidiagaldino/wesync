export type TUserProps = {
    name: string
    email: string // TODO: create value object email
    photo: string // TODO: create value object photo
    status: string // TODO: create value object status
}

export class User {
    id: number
    props: TUserProps

    constructor(props: TUserProps) {
        this.props = props
    }

    getId() {
        return this.id
    }

    getName() {
        return this.props.name
    }

    getEmail() {
        return this.props.email
    }

    getPhoto() {
        return this.props.photo
    }

    getStatus() {
        return this.props.status
    }

    setId(id: number) {
        this.id = id
    }

    setName(name: string) {
        this.props.name = name
    }

    setEmail(email: string) {
        this.props.email = email
    }

    setPhoto(photo: string) {
        this.props.photo = photo
    }

    setStatus(status: string) {
        this.props.status = status
    }
}