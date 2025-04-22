import useLocalStorage from "use-local-storage";
import { ContactForm, contactFormSchema } from "@/schemas/contactForm.schema";
import { RouteFormData, newRoute } from "@/schemas/routeForm.schema";
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
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

//Todo: there is a nice animation that when you select an empty input/textarea is transitioned
//to the label for the input!

function Payment() {
  const [bookingData, setBookingData] = useLocalStorage<ContactForm>(
    "contactInfo",
    {
      contactInformation: {
        "first-name": "",
        "last-name": "",
        "phone-number": "",
        email: "",
      },
      "moving-from": "",
      "moving-to": "",
      consent: false,
      "crew-notes": "",
    },
  );

  const [routeData] = useLocalStorage<RouteFormData>("routesData", {
    routes: [newRoute],
  });

  const [dateData] = useLocalStorage<{
    "selected-date": Date;
    time: string;
  }>("dateInfo", {
    "selected-date": new Date(),
    time: "",
  });

  console.log(bookingData);
  console.log(routeData);
  console.log(dateData);

  const contactForm = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: bookingData,
  });

  useEffect(() => {
    const contactSubscription = contactForm.watch((values) => {
      setBookingData(values as ContactForm);
    });
    return () => contactSubscription.unsubscribe();
  }, [contactForm, setBookingData]);

  function onSubmit(values: ContactForm) {
    console.log(values, "TAKE PAYMENT");
  }

  return (
    <div>
      <p className=" text-amber-500">
        ***This color means that the info has been hardcoded***
      </p>
      <h1>Complete and reserve your crew. Fully refundable.</h1>
      <div>
        <h2>Reservation Summary</h2>
        <h3>Moving Reservation</h3>
        <p className=" text-amber-500">Apr 23, 2025 at 8 AM</p>
        <div>
          {routeData.routes.map((stop, index) => (
            <div key={index}>
              {stop.address}
              {stop.unit}
            </div>
          ))}
          <div>
            <div className=" text-amber-500">
              $189/hr + $99 Travel Fee for crew of 3
            </div>
          </div>
          <div>
            <h2>Contact Information</h2>
            <Form {...contactForm}>
              <form
                onSubmit={contactForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={contactForm.control}
                  name="contactInformation.first-name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your first name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={contactForm.control}
                  name="contactInformation.last-name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={contactForm.control}
                  name="contactInformation.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={contactForm.control}
                  name="contactInformation.phone-number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your phone number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={contactForm.control}
                  name="crew-notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Notes for your crew (Gate code, elevator code, etc...)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Notes for your crew (Gate code, elevator code, etc...)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <div>
              <h2>Pricing Information</h2>
              <h3>Move Reservation</h3>
              <span className=" flex flex-row">
                <p>Hourly Rate (2h minimum)</p>
                <p className=" text-amber-500">$149 /hr</p>
              </span>
              <span className=" flex flex-row">
                <p>Travel Fee (due today $50)</p>
                <p className=" text-amber-500">$140</p>
              </span>
              <span className=" flex flex-row">
                <p>Deposit due today:</p>
                <p className=" text-amber-500">$50</p>
              </span>
              <ul className=" list-disc">
                <li>Free cancellation</li>
                <li>Deposit applied to total bill</li>
              </ul>
            </div>
          </div>
          <div>
            <h2>Billing Information</h2>
            ***DEPOSIT FORM HERE***
          </div>
          <Button type="submit">PAY DEPOSIT AND RESERVE</Button>
          <p>Fully refundable up to 24 hours before the move day.</p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
