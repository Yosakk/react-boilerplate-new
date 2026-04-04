import type { Meta } from "./pagination.interface";

export type ManagementType = "Admin" | "Collaborator";

export interface GetCollaboratorResI {
  data: CollaboratorI[];
  meta: Meta;
}

export interface CollaboratorI {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  banner?: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
  role: ManagementType;
}

export interface CollaboratorPayloadI {
  name: string;
  email: string;
  password: string;
}
