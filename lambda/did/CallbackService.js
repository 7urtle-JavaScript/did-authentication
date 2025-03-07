import { map } from '@7urtle/lambda';

import logger from '../../src/logger';
import { SignIn } from "../../effects/Callback";

const processCallback = request =>
    SignIn(request)
    .trigger
    (errors => map(error => logger.error(`DID Callback: ${error}`))(errors) && ({
        statusCode: 500,
        body: 'Internal Server Error'
    }))
    (() => ({
        statusCode: 204
    }));

export {
    processCallback
};