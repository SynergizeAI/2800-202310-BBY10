import { nanoid } from "nanoid";
import db from "../db/conn.mjs";

export default async function generateUniqueCode() {
  let code;
  let isDuplicate = true;

  // Generate a new code until a unique one is found
  while (isDuplicate) {
    code = nanoid(5); // Generate a random 5 character string
    const existingSpace = await db.collection("chatSpaces").findOne({ code });

    // If no existing space with the generated code is found, it is unique
    if (!existingSpace) {
      isDuplicate = false;
    }
  }

  return code;
}
