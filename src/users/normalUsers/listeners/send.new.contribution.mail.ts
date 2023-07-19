import { mail, logger, NewContributionNotificationOptions } from "../../../core";

class SendNewContributionNotification {

    handle = (options: NewContributionNotificationOptions) => {

        // This can be made more efficient by using a queue and simple client like redis.
        options.emails.forEach((email: string) => {
            Promise.resolve(
                mail.send({
                    fileName: './templates/send-new-contribution.ejs',
                    subject: 'New Contribution',
                    data: {
                        amount: options.amount,
                        date: options.when,
                    },
                    email,
                })
            )
        })
        logger.info("New contribution notification sent successfully");
    }
}

export const sendNewContributionNotification = new SendNewContributionNotification();