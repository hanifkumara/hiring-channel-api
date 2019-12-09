module.exports = {
    ok: (res, values, message = 'Operation succes', code = 200) => {
        res.status(code).json({
            status: code,
            error: false,
            message,
            values
        });
    },
    err: (res, err, message = 'Ops, something went wrong') => {
        res.status(400).json({
            status: 400,
            error: true,
            message
        });
        console.log(err);
    }
}