import { auth } from "../lib/auth.js";
import { createToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const resolvers = {
  async register(args) {
    const { input } = args;
    const { password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...input, password: hashedPassword });
    const token = createToken({ userId: user.id });

    return { token, user };
  },
  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = createToken({ userId: user.id });

    return { token, user };
  },
  profile: auth(async (args, context) => {
    const user = await User.findById(context.userId);
    return user;
  }),
};

export default resolvers;
