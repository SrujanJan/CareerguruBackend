export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const cookieExpire = parseInt(process.env.COOKIE_EXPIRE); // Parse COOKIE_EXPIRE as an integer
    const options = {
      expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
      httpOnly: true, // Set httpOnly to true
      secure:true,
      sameSite:"None",
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
  };
  