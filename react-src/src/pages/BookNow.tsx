import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const formSchema = z.object({
    contactInformation: z.object({
        "full-name": z.string().min(2).max(50),
        email: z.string().min(2).max(50),
        "phone-number": z.string().min(2).max(50),
    }),
    "moving-from": z.string().min(2).max(50),
    "moving-to": z.string().min(2).max(50),
    consent: z.boolean(),
});

function BookNow() {
    const [data, setData] = useLocalStorage<z.infer<typeof formSchema>>(
        "contactInfo",
        {
            contactInformation: {
                "full-name": "",
                email: "",
                "phone-number": "",
            },
            "moving-from": "",
            "moving-to": "",
            consent: false,
        },
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    });

    useEffect(() => {
        const subscription = form.watch((values) => {
            setData(values as z.infer<typeof formSchema>);
        });
        return () => subscription.unsubscribe();
    }, [form, setData]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        window.location.assign("/booking/move-date");
    }

    return (
        <div>
            <div>
                <h2>Online Booking</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="moving-from"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Moving From</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="moving-to"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Moving To</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactInformation.full-name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="contactInformation.email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactInformation.phone-number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="consent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Accept terms and conditions</FormLabel>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Start Booking</Button>
                    </form>
                </Form>
            </div>
            <div>
                <h2>Book Your Move Online</h2>
                <p>We know you’re busy, so we make it easy to book your move online.</p>
            </div>
        </div>
    );
}

export default BookNow;
