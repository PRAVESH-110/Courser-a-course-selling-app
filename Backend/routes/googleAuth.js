const Router = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { GOOGLE_CLIENT_ID, JWT_USER_PASSWORD } = require("../../config");

const googleAuthRouter = Router();
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Google authentication endpoint
googleAuthRouter.post('/google', async function(req, res) {
    const { token } = req.body;

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, given_name: firstName, family_name: lastName } = payload;

        // Check if user already exists with this Google ID
        let user = await userModel.findOne({ googleId });

        if (!user) {
            // Check if user exists with this email but different auth method
            user = await userModel.findOne({ email });
            
            if (user) {
                // User exists but with local authentication, update to include Google ID
                user.googleId = googleId;
                user.authMethod = 'google';
                await user.save();
            } else {
                // Create new user with Google authentication
                user = await userModel.create({
                    email,
                    firstName: firstName || '',
                    lastName: lastName || '',
                    googleId,
                    authMethod: 'google'
                });
            }
        }

        // Generate JWT token
        const jwtToken = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        res.json({
            token: jwtToken,
            message: "Google sign-in successful",
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        console.error("Google authentication failed:", error);
        res.status(500).json({
            message: "Google authentication failed",
            error: error.message
        });
    }
});

module.exports = {
    googleAuthRouter: googleAuthRouter
};
