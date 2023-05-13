import { Group, Member, User } from "@prisma/client";
import profileViewer from "./profile";

export default async function viewer(
  member: Member & { user: User & { groups: Group[] } }
) {
  const view = {
    id: member.id,
    user: profileViewer(member)
  }
};
