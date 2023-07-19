import { ProjectContributions, ProjectTransactions, Projects } from "../../../projects";
import { User, UserRoles } from "../../../users/model";
import { MakeContribution } from "./contribute.to.project";
import { ViewRoles } from "./see.all.roles";

export const makeContribution = new MakeContribution(User, Projects, ProjectContributions, ProjectTransactions);
export const viewRoles = new ViewRoles(UserRoles);