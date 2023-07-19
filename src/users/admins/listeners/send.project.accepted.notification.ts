import { AdminProjectDecisionOptions, logger, mail } from "../../../core"


class SendProjectAcceptedNotification {

    handle = async ({
        name,
        email,
        project,
        status,
        accepted_at,
        rejected_at
    }: AdminProjectDecisionOptions) => {
        Promise.resolve(
            mail.send({
                fileName: './templates/project.proposal.accpeted.ejs',
                subject: "New project proposal",
                email,
                data: {
                    name,
                    status,
                    projectName: project,
                    time: accepted_at || rejected_at,
                }
            })
        )
        .then(() => {
            logger.info("Admin decision sent to project owner.");
        })
    }
}

export const sendProjectAcceptedNotification = new SendProjectAcceptedNotification();