import { withSwagger } from 'next-swagger-doc';

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