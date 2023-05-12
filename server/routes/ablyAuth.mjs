import express from "express";
import { ably } from "../ably.mjs";
import getUserIdFromToken from "../utils/getUserIdFromToken.js";


const router = express.Router();

router.get("/", (req, res) => {
  const chatSpaceId = req.query.chatSpaceId;
  const userId = getUserIdFromToken(req.cookies.token);
  const tokenParams = {
    clientId: "user-" + userId,
    capability: JSON.stringify({
      ["private-" + chatSpaceId]: ["publish", "subscribe", "presence"],
    }),
  };

  ably.auth.createTokenRequest(tokenParams, (err, tokenRequest) => {
    if (err) {
      res.status(500).send("Error creating token request: " + err);
    } else {
      ably.auth.requestToken(tokenRequest, (err, tokenDetails) => {
        if (err) {
          res.status(500).send("Error requesting token: " + err);
        } else {
          const token = tokenDetails.token;
          res.send(token);
        }
      });
    }
  });
});

export default router;
