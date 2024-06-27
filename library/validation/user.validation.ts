import * as z from "zod";
import { UserSchema } from "../schema/user.schema";

type a = UserSchema;

const ValidUserSchema = z.object({
  email: z.string().email("Must be valid email"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required."),
  name: z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
  }),
  address: z.object({
    city: z.string().min(1, "City is required"),
    street: z.string().min(1, "Street is required"),
    number: z.number().nullable(),
    zipcode: z.string().min(4, "Invalid Zip Code"),
    geolocation: z.object({
      lat: z.string().nullable(),
      long: z.string().nullable(),
    }),
  }),
  phone: z.string().min(10, "Phone is required"),
});

type TValidUserSchema = z.infer<typeof ValidUserSchema>;

export { ValidUserSchema, TValidUserSchema };
