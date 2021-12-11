module.exports = {
    reqError400: function (res) {
        res.status(400);
        res.statusMessage = "invalid request.";
        res.send();
        return;
    }
}