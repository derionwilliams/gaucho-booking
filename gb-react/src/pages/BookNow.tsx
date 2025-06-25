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
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";
import {
    contactFormSchema,
    type ContactForm,
} from "@/schemas/contactForm.schema";

function BookNow() {
    const [data, setData] = useLocalStorage<ContactForm>("contactInfo", {
        contactInformation: {
            "first-name": "",
            "last-name": "",
            email: "",
            "phone-number": "",
        },
        "moving-from": "",
        "moving-to": "",
        consent: false,
    });

    const form = useForm<ContactForm>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: data,
    });

    useEffect(() => {
        const subscription = form.watch((values) => {
            setData(values as ContactForm);
        });
        return () => subscription.unsubscribe();
    }, [form, setData]);

    function onSubmit(values: ContactForm) {
        console.log(values);
        window.location.assign("/booking/move-date");
    }

    async function testServer() {
        try {
            const res = await fetch(
                "https://summit-booking-9h3xy.ondigitalocean.app/list-jobs",
            );
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            const data = await res.json();
            console.log("JSON from /list-jobs:", data);
        } catch (err) {
            console.error("Fetch error:", err);
        }
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
                            name="contactInformation.first-name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your first name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactInformation.last-name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your last name" {...field} />
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
                                <FormItem className=" flex ">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="block">
                                        <FormLabel className=" block">
                                            I agree to texts and calls under{" "}
                                            <a
                                                href="#"
                                                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                                            >
                                                terms
                                            </a>{" "}
                                            and{" "}
                                            <a
                                                href="#"
                                                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                                            >
                                                privacy
                                            </a>
                                            .
                                        </FormLabel>
                                        <p className=" text-sm">
                                            We don't sell your data to anyone for any purpose.
                                        </p>
                                    </div>
                                    <FormMessage className=" px-2" />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" variant={"default"}>
                            Start Booking
                        </Button>
                    </form>
                </Form>
            </div>
            <div>
                <h2>Book Your Move Online</h2>
                <p>We know you’re busy, so we make it easy to book your move online.</p>
            </div>
            <Button type="button" variant={"destructive"} onClick={testServer}>
                Server Test!
            </Button>
        </div>
    );
}

export default BookNow;
