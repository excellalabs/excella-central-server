function setUserInfo(request){
    return {
        _id: request._id,
        email: request.email,
        role: request.role
    };
}

exports.ssoAuthentication = function(req, res, next){
    console.log("success");
    var userInfo = setUserInfo(req.user);
 
    res.status(200).json({
        user: userInfo
    });
 
}