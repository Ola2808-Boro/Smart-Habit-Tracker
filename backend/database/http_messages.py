HTTP_LOG_MESSAGES = {
    200: "Request succeeded. Function: {function_name}.",
    201: "Resource created successfully. Function: {function_name}.",
    204: "No content returned. Function: {function_name}.",
    400: "Bad request in function: {function_name}. Details: {details}.",
    401: "Unauthorized access attempt in function: {function_name}. Reason: {details}.",
    403: "Forbidden. User lacks permissions in function: {function_name}.",
    404: "Resource not found in function: {function_name}. Endpoint: {details}.",
    409: "Conflict in function: {function_name}. Details: {details}.",
    422: "Unprocessable entity in function: {function_name}. Details: {details}.",
    429: "Rate limit exceeded in function: {function_name}.",
    500: "Internal server error in function: {function_name}. Error: {details}.",
    503: "Service unavailable in function: {function_name}. Reason: {details}.",
}
