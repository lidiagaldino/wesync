import { Email } from '../value-objects/email.value-object';
import { Status } from '../value-objects/status.value-object';
import { Url } from '../value-objects/url.value-object';

export type TUserProps = {
  name: string;
  email: Email;
  photo: Url;
  status: Status;
};

export class User {
  id: number;
  props: TUserProps;

  constructor(props: TUserProps) {
    this.props = props;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.props.name;
  }

  getEmail() {
    return this.props.email;
  }

  getPhoto() {
    return this.props.photo;
  }

  getStatus() {
    return this.props.status;
  }

  setId(id: number) {
    this.id = id;
  }

  setName(name: string) {
    this.props.name = name;
  }

  setEmail(email: Email) {
    this.props.email = email;
  }

  setPhoto(photo: Url) {
    this.props.photo = photo;
  }

  setStatus(status: Status) {
    this.props.status = status;
  }
}
