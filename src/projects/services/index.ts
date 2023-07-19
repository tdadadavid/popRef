import { ProjectApprovalStatus, ProjectContributions, ProjectTransactions, Projects } from "../model";
import { SeeTransactions } from "./see.project.transactions";
import { SeeProjects } from "./see.projects";

export const seeProjects = new SeeProjects(Projects, ProjectApprovalStatus);
export const seeProjectTxn = new SeeTransactions(ProjectContributions, ProjectTransactions)
