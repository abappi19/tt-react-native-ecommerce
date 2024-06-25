import * as z from "zod";

const ValidAuthLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required."),
});

type TValidAuthLoginSchema = z.infer<typeof ValidAuthLoginSchema>;

export { ValidAuthLoginSchema, TValidAuthLoginSchema };
