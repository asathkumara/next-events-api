import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const ApiDoc = ({ spec }) => {
    return <SwaggerUI spec={spec} />;
};

export const getServerSideProps = async (context) => {
    const spec = createSwaggerSpec({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Group Event Organizer',
                version: '0.1.0',
                description: "A REST API that allows people organize group events.",
                contact: {
                    name: "Asel S"
                }
            }
        },
    });
    return {
        props: { spec },
    };
};

export default ApiDoc;