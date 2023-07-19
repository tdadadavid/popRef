import { SeeProjectsProposal } from "./see.projects.proposals";
import { CreateRole } from "./create.user.roles";
import { ProjectApprovalStatus, Projects } from "../../../projects";
import { User, UserRoles } from "../../../users/model";
import { DecideOnProposal } from "./decide.on.project";

export const seeProjectProposals = new SeeProjectsProposal(Projects);
export const createRole = new CreateRole(UserRoles);
export const decideOnProposal = new DecideOnProposal(User, Projects, ProjectApprovalStatus);