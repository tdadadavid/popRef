import { logger, config } from "../core";
import { sendProjectAcceptedNotification, sendNewContributionNotification, sendNewProjectProposalNotification, registerDefaultApprovalStatus, registerDefaultUserRoles } from "../users";

/**
 * Event Listener Registry.
 */
export const register = {
  "app:up": [
    registerDefaultApprovalStatus.handle,
    registerDefaultUserRoles.handle,
    () => logger.info(`Server started successfully on port ${config.port}`)
  ],
  "project:maturity:reached": [
    
  ],
  "new:contribution": sendNewContributionNotification.handle,
  "new:artist:project:proposal": sendNewProjectProposalNotification.handle,
  "project:proposal:decision": sendProjectAcceptedNotification.handle,
  "event:registeration:succesful": () => logger.info("Events listeners registered"),
}; 