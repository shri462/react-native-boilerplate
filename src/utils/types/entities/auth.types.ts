import { IDocument } from "../common";

export interface IUser extends IDocument {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
