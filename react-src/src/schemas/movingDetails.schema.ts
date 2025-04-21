import { z } from "zod";

export const BELONGINGS_GOING = [
    "Everything's going",
    "Most of my items",
    "About half of my belongings",
    "Just a few items",
] as const;
export const belongingsEnum = z.enum(BELONGINGS_GOING);
export const SPECIALTY_ITEMS = [
    "",
    "Antiques",
    "Gun Safes",
    "Pianos",
    "Pool Tables",
] as const;
export const specialtyItemsEnum = z.enum(SPECIALTY_ITEMS);
export const specialtyMultiSelect = z.array(specialtyItemsEnum);
export const detailsSchema = z.object({
    "belongings-going": belongingsEnum,
    "specialty-items": specialtyMultiSelect,
});

export type DetailsData = z.infer<typeof detailsSchema>;
