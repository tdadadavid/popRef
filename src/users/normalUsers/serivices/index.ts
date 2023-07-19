import { ProjectContributions, ProjectTransactions, Projects } from "../../../projects";
import { User, UserProjects, UserRoles } from "../../../users/model";
import { MakeContribution } from "./contribute.to.project";
import { ViewRoles } from "./see.all.roles";
import { SellTokens } from "./sell.token.in.a.project";

export const makeContribution = new MakeContribution(User, Projects, ProjectContributions, ProjectTransactions);
export const viewRoles = new ViewRoles(UserRoles);
export const sellToken = new SellTokens(User, Projects, ProjectContributions, UserProjects, ProjectTransactions)