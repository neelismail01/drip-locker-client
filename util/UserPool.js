import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { AWS_COGNITO_POOL_ID, AWS_APP_CLIENT_ID } from "@env";

const poolData = {
    UserPoolId: AWS_COGNITO_POOL_ID,
    ClientId: AWS_APP_CLIENT_ID
}

export default new CognitoUserPool(poolData);