import { ProjectApprovalStatus, Projects } from "../../../projects";
import { SubmitProposal } from "./submit.project";
import { ViewProjects } from "./view.projects";
import { User, UserRoles } from "../../../users/model";

export const submitProposal = new SubmitProposal(Projects, ProjectApprovalStatus, UserRoles, User);
export const viewProjects = new ViewProjects(User, Projects, ProjectApprovalStatus);