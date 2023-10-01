exports.getDate = function() {
    var today = new Date();
    var options = {
        day: "numeric",
        weekday: "long",
        month: "long"
    };

    return today.toLocaleDateString("en-US", options);
}

exports.getDate = function() {
    var today = new Date();
    var options = {
        weekday: "long"
    };

    return today.toLocaleDateString("en-US", options);
}