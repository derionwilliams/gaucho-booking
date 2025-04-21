import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import { z } from "zod";

//TODO:
//  - append an empty route when adding a new one
//  - address not changing if you delete a stop before it; requires page refresh to work

const PROPERTY_TYPES = [
    "",
    "Home/Townhouse",
    "Apartment",
    "Highrise",
    "Office",
    "Storage",
] as const;

const propertyTypeEnum = z.enum(PROPERTY_TYPES);

const NUM_BEDROOMS = ["", "1", "2", "3", "4", "5"] as const;
const bedroomsEnum = z.enum(NUM_BEDROOMS);

const SQFT_RANGES = [
    "",
    "0-1000",
    "1000-1500",
    "1500-2000",
    "2000-3000",
    "3000+",
] as const;
const sqftEnum = z.enum(SQFT_RANGES);

const GARAGE_SIZES = ["", "none", "1 car", "2 car", "3+ car"] as const;
const garageEnum = z.enum(GARAGE_SIZES);

const NUM_STORIES = ["", "1", "2", "3", "4+"] as const;
const storiesEnum = z.enum(NUM_STORIES);

const routeSchema = z.object({
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

const formSchema = z.object({
    routes: z.array(routeSchema).nonempty("At least one address is required"),
});

type FormData = z.infer<typeof formSchema>;

type RouteProps = {
    form: UseFormReturn<FormData>;
    index: number;
};

type RouteOptionProps = {
    index: number;
    numRoutes: number;
    swap: (from: number, to: number) => void;
    remove: (index?: number | number[]) => void;
};

type RouteInput = z.input<typeof routeSchema>;

const newRoute: NewRoute = {
    address: "",
    unit: "",
    "property-type": "Home/Townhouse",
    bedrooms: "1",
    sqft: "0-1000",
    garage: "none",
    stories: "1",
} satisfies RouteInput;

type NewRoute = z.infer<typeof routeSchema>;

function Route({ form, index }: RouteProps) {
    const numRoutes = form.getValues("routes").length - 1;
    const handleDescription = () => {
        if (index == 0) {
            return "Moving From";
        } else if (index > 0 && index < numRoutes) {
            return `Stop ${index}`;
        } else {
            return "Moving To";
        }
    };
    return (
        <div>
            <div className=" flex flex-row">
                <FormField
                    control={form.control}
                    name={`routes.${index}.address`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Input a valid street address" {...field} />
                            </FormControl>
                            <FormDescription>{handleDescription()}</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`routes.${index}.unit`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="unit" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name={`routes.${index}.property-type`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row"
                            >
                                {propertyTypeEnum.options
                                    .filter((opt) => opt !== "")
                                    .map((opt) => (
                                        <div key={opt}>
                                            <RadioGroupItem value={opt} id={opt} />
                                            <Label htmlFor={opt}>{opt}</Label>
                                        </div>
                                    ))}
                            </RadioGroup>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`routes.${index}.bedrooms`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row"
                            >
                                {bedroomsEnum.options
                                    .filter((opt) => opt !== "")
                                    .map((opt) => (
                                        <div key={opt}>
                                            <RadioGroupItem value={opt} id={opt} />
                                            <Label htmlFor={opt}>{opt}</Label>
                                        </div>
                                    ))}
                            </RadioGroup>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`routes.${index}.sqft`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Square Footage</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row"
                            >
                                {sqftEnum.options
                                    .filter((opt) => opt !== "")
                                    .map((opt) => (
                                        <div key={opt}>
                                            <RadioGroupItem value={opt} id={opt} />
                                            <Label htmlFor={opt}>{opt}</Label>
                                        </div>
                                    ))}
                            </RadioGroup>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`routes.${index}.garage`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Garage</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row"
                            >
                                {garageEnum.options
                                    .filter((opt) => opt !== "")
                                    .map((opt) => (
                                        <div key={opt}>
                                            <RadioGroupItem value={opt} id={opt} />
                                            <Label htmlFor={opt}>{opt}</Label>
                                        </div>
                                    ))}
                            </RadioGroup>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name={`routes.${index}.stories`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stories</FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row"
                            >
                                {storiesEnum.options
                                    .filter((opt) => opt !== "")
                                    .map((opt) => (
                                        <div key={opt}>
                                            <RadioGroupItem value={opt} id={opt} />
                                            <Label htmlFor={opt}>{opt}</Label>
                                        </div>
                                    ))}
                            </RadioGroup>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

function RouteOptions({ index, numRoutes, swap, remove }: RouteOptionProps) {
    const handleRemove = useRemoveHandler(index, remove);
    const handleMoveUp = () => swap(index, index - 1);
    const handleMoveDown = () => swap(index, index + 1);
    if (numRoutes == 2) {
        if (index == 0) {
            return (
                <div>
                    <MoveDown onClick={handleMoveDown} />
                </div>
            );
        } else {
            return <MoveUp onClick={handleMoveUp} />;
        }
    } else if (numRoutes > 2) {
        if (index == 0) {
            return (
                <div>
                    <MoveDown onClick={handleMoveDown} />
                    <RemoveStop onClick={handleRemove} />
                </div>
            );
        } else if (index == numRoutes - 1) {
            return (
                <div>
                    <MoveUp onClick={handleMoveUp} />
                    <RemoveStop onClick={handleRemove} />
                </div>
            );
        } else {
            return (
                <div className="mb-12 text-red">
                    <MoveUp onClick={handleMoveUp} />
                    <MoveDown onClick={handleMoveDown} />
                    <RemoveStop onClick={handleRemove} />
                </div>
            );
        }
    }
}

function MoveDown({ onClick }: { onClick: () => void }) {
    return <Button onClick={onClick}>Move Down</Button>;
}
function MoveUp({ onClick }: { onClick: () => void }) {
    return <Button onClick={onClick}>Move Up</Button>;
}

function RemoveStop({ onClick }: { onClick: () => void }) {
    return <Button onClick={onClick}>Remove</Button>;
}

function useRemoveHandler(
    index: number,
    remove: (index?: number | number[]) => void,
) {
    return useCallback(() => {
        remove(index);
    }, [index, remove]);
}

function Routes() {
    const [data, setData] = useLocalStorage<FormData>("routesData", {
        routes: [newRoute],
    });

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
        mode: "onChange",
    });

    const { fields, append, remove, swap } = useFieldArray({
        control: form.control,
        name: "routes",
    });

    useEffect(() => {
        const subscription = form.watch((values) => {
            if (values.routes) {
                setData(values as FormData);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, setData]);

    function onSubmit(values: FormData) {
        console.log("Form Submitted:", values);
        nextPage();
    }

    function nextPage() {
        window.location.assign("/booking/moving-details");
    }

    function previousPage() {
        window.location.assign("/booking/routes");
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {fields.map((field, index) => (
                        <div key={field.id} className="my-12 border border-solid">
                            <RouteOptions
                                index={index}
                                numRoutes={fields.length}
                                swap={swap}
                                remove={remove}
                            />
                            <Route form={form} index={index} />
                        </div>
                    ))}
                    <Button type="button" onClick={previousPage}>
                        Previous
                    </Button>
                    <Button type="button" onClick={() => append(newRoute)}>
                        Add A Stop
                    </Button>
                    <Button type="submit" onClick={() => onSubmit}>
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default Routes;
