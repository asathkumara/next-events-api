import { withSwagger } from 'next-swagger-doc';

/**
 * @swagger
 *
 * tags:
 *   - name: User
 *     description: operations for user
 *   - name: Group
 *     description: operations for group
 *   - name: Message
 *     description: operations for messages
 *   - name: Event
 *     description: operations for events
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The BSON ID of the user. [Generated value]
 *         name:
 *           type: string
 *           description: The name of the user.
 *         joinedAt:
 *           type: string
 *           description: The timestamp for the account creation.
 *         interests:
 *           type: array
 *           items:
 *             type: string
 *           description: A list of the user's interests.
 *         active:
 *           type: boolean
 *           description: Indicates whether the user is active.
 *
 *     Group:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The BSON ID of the group. [Generated value]
 *         userID:
 *           type: string
 *           description: The BSON ID of the user creating the group
 *         name:
 *           type: string
 *           description: The name for the group being created
 *         members:
 *           type: array
 *           items:
 *             type: string
 *             description: The BSON ID's of the users in the group
 *         messages:
 *           type: array
 *           items:
 *             type: string
 *             description: The BSON ID's of the messages posted to the group
 *         events:
 *           type: array
 *           items:
 *             type: string
 *             description: The BSON ID's of the events scheduled for the group
 *
 *     Message:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The BSON ID of the message. [Generated value]
 *         userID:
 *           type: string
 *           description: The BSON ID of the user sending the message
 *         contents:
 *           type: string
 *           description: The message contents
 *         postedAt:
 *           type: string
 *           description: The timestamp for when the message was posted.
 *
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The BSON ID of the event. [Generated value]
 *         createdBy:
 *           type: string
 *           description: The BSON ID of the user who created the event
 *         name:
 *           type: string
 *           description: The name of the event
 *         startsAt:
 *           type: string
 *           description: The timestamp for the event's starting time
 *         endsAt:
 *           type: string
 *           description: The timestamp for the event's ending time
 */
const swaggerHandler = withSwagger({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Group Event Organizer',
            version: '0.1.0',
            description: "A REST API that allows people organize group events.",
            contact: {
                name: "Asel S"
            }
        },
    },
    apiFolder: 'pages/api',
});

export default swaggerHandler();