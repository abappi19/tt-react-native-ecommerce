import * as z from "zod";

const ValidAuthLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required."),
});

type TValidAuthLoginSchema = z.infer<typeof ValidAuthLoginSchema>;

/**
 * {
                    email:'John@gmail.com',
                    username:'johnd',
                    password:'m38rmF$',
                    name:{
                        firstname:'John',
                        lastname:'Doe'
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
 */

const ValidAuthRegisterSchema = z.object({
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

type TValidAuthRegisterSchema = z.infer<typeof ValidAuthRegisterSchema>;

export {
  ValidAuthLoginSchema,
  TValidAuthLoginSchema,
  ValidAuthRegisterSchema,
  TValidAuthRegisterSchema,
};
