import 'source-map-support/register';
import { ProxyHandler } from "aws-lambda";

export const handler: ProxyHandler = (async (event, context) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			success: 1,
		})
	}
});
