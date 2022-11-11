export const asStringParameters = (parameters:any) =>
  Object.keys(parameters)
    .map((key) => key + '=' + parameters[key])
    .join('&');
