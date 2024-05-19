const jwt = require("jsonwebtoken");
const { User, mongoose } = require("./models/user.js");

const createAccessAndRefreshToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return res.status(500).send("Something went wrong while creating tokens");
  }
};

const registerUser = async (req, res) => {
    console.log(req.body);
  const { username, email, password, skills} = req.body;
//   if (
//     [username, email, password, skills].some(
//       (field) => field?.trim() === ""
//     )
//   ) {
//     return res.status(400).send("All fields are required");
//   }
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(409).send("User already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: password,
    skills:skills
  });
  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!userCreated) {
    return res.status(500).send("Something went wrong while creating a user");
  }
  
  return res
    .status(201)
    .json(new ApiResponse(201, userCreated, "User created Successfully"));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    return res.status(400).send("All fields are required");
  }
  const user = await User.findOne({ email: email });
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(400).send("INVALID user credentials");
  }

  const { accessToken, refreshToken } = await createAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json({
    status: 200,
    data: {
      user: loggedUser,
      accessToken,
      refreshToken,
    },
    message: "User Logged Successfully"
  });

};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json({
    status: 200,
    message: "User Logged Out"
  });
};

const getProfile = async (req, res) => {
    const user = await User.findById(req.user?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json({
        status: 200,
        message: "User Profile",
        data: user
      });
  };

const refreshToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).send("Unauthorized");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!decodedToken) {
    return res.status(401).send("Unauthorized Access");
  }

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    return res.status(401).send("Unauthorized Access");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    return res.status(401).send("Refresh Token is Expired or Used");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { newAccessToken, newRefreshToken } = createAccessAndRefreshToken(
    user._id
  );
  return res
  .status(200)
  .cookie("accessToken", newAccessToken, options)
  .cookie("refreshToken", newRefreshToken, options)
  .json({
    status: 200,
    data: {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    },
    message: "Token Refreshed Successfully"
  });

};

module.exports = {
    createAccessAndRefreshToken,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    refreshToken
  };