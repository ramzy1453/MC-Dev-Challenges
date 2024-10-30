import { verifyToken } from "./utils.js";

export const auth = (resolve) => async (args, context) => {
  const { authHeaders } = context;
  if (!authHeaders) {
    return { message: "Unauthorized" };
  }

  const token = authHeaders.split("Bearer ")[1];

  if (!token) {
    return { message: "Unauthorized" };
  }

  try {
    const payload = verifyToken(token);
    context.userId = payload.userId;

    return resolve(args, context);
  } catch (error) {
    return { message: "Unauthorized" };
  }
};
