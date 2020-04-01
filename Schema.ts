const userSchema = {
  version: 0,
  title: "user schema",
  description: "describes a user",
  type: "object",
  properties: {
    name: {
      type: "string",
      primary: true
    },
    user: {
      type: "string"
    },
    password: {
      type: "string"
    }
  },
  required: ["user", "password"]
};

export default userSchema;
