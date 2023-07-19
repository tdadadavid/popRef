import { ProjectApprovalStatus, Projects } from "../model";
import { SeeProjects } from "./see.projects";

export const seeProjects = new SeeProjects(Projects, ProjectApprovalStatus);
