import { z } from "zod";

export const contactFormSchema = z.object({
  contactInformation: z.object({
    "full-name": z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    "phone-number": z.string().min(2).max(50),
  }),
  "moving-from": z.string().min(2).max(50),
  "moving-to": z.string().min(2).max(50),
  consent: z.boolean(),
  "crew-notes": z.string().max(2200).optional(),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
