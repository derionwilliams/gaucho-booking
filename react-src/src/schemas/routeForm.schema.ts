import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

export const PROPERTY_TYPES = [
    "",
    "Home/Townhouse",
    "Apartment",
    "Highrise",
    "Office",
    "Storage",
] as const;

export const propertyTypeEnum = z.enum(PROPERTY_TYPES);

export const NUM_BEDROOMS = ["", "1", "2", "3", "4", "5"] as const;
export const bedroomsEnum = z.enum(NUM_BEDROOMS);

export const SQFT_RANGES = [
    "",
    "0-1000",
    "1000-1500",
    "1500-2000",
    "2000-3000",
    "3000+",
] as const;
export const sqftEnum = z.enum(SQFT_RANGES);

export const GARAGE_SIZES = ["", "none", "1 car", "2 car", "3+ car"] as const;
export const garageEnum = z.enum(GARAGE_SIZES);

export const NUM_STORIES = ["", "1", "2", "3", "4+"] as const;
export const storiesEnum = z.enum(NUM_STORIES);

export const routeSchema = z.object({
    address: z
        .string()
        .min(2, "Address must be at least 2 charactes")
        .max(50, "Address cannot exceed 50 characters")
        .refine((v) => v !== "", { message: "Please input an address" }),
    unit: z
        .string()
        .max(10, "Unit number cannon exceed 10 characters")
        .optional(),
    "property-type": propertyTypeEnum,
    bedrooms: bedroomsEnum,
    sqft: sqftEnum,
    garage: garageEnum,
    stories: storiesEnum,
});

export const formSchema = z.object({
    routes: z.array(routeSchema).nonempty("At least one address is required"),
});

export type FormData = z.infer<typeof formSchema>;

export type RouteProps = {
    form: UseFormReturn<FormData>;
    index: number;
};

export type RouteOptionProps = {
    index: number;
    numRoutes: number;
    swap: (from: number, to: number) => void;
    remove: (index?: number | number[]) => void;
};

export type RouteInput = z.input<typeof routeSchema>;

export const newRoute: NewRoute = {
    address: "",
    unit: "",
    "property-type": "Home/Townhouse",
    bedrooms: "1",
    sqft: "0-1000",
    garage: "none",
    stories: "1",
} satisfies RouteInput;

export type NewRoute = z.infer<typeof routeSchema>;
