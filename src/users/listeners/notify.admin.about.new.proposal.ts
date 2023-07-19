import { NewProjectProposal, logger, mail } from "../../core"


class SendNewProjectProposalNotification {

    handle = async ({
        email,
        project,
        estimatedCost,
        artist 
    }: NewProjectProposal): Promise<void> => {
        Promise.resolve(
            mail.send({
                fileName: './templates/new.project.proposal.ejs',
                subject: "New project proposal",
                email,
                data: {
                    projectName: project,
                    estimatedCost,
                    artist,
                }
            })
        )
        .then(() => {
            logger.info("Proposal sent");
        })
    }
}


export const sendNewProjectProposalNotification = new SendNewProjectProposalNotification();
