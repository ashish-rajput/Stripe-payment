exports = module.exports = {};

exports.okResponse = (message, res, data) => {
    res.status(200);
    return res.json({ status: 200, message, data: data || [] });
};

exports.matchResponse = (message, res, data, status) => {
    res.status(200);
    return res.json({ status: 200, message, data: data || [], isMatched: status || false });
};

exports.validationResponse = (message, res) => {
    res.status(400);
    res.json({ status: 400, error: message || 'Error occurred'  });
};

exports.serviceUnavailable = (message, res) => {
    res.status(503);
    return res.json({ status: 503, error: message || 'Internal server error' });
};

exports.unAuthorizedResponse = (message, res) => {
    res.status(401);
    return res.json({ status: 401, error: message || 'Unauthorized request' });
};

exports.forbiddenResponse = (message, res) => {
    res.status(403);
    return res.json({ status: 403, error: message || '' });
};

exports.notFoundResponse = (message, res) => {
    res.status(404);
    return  res.json({ status: 404, error: message || 'Resource not found' });
};

exports.conflictResponse = (message, res, data) => {
    res.status(409);
    return  res.json({ status: 409, error: message || 'Already exist',data: data || {} });
};
