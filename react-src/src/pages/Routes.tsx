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
import { useFieldArray, useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import {
  RouteProps,
  propertyTypeEnum,
  bedroomsEnum,
  sqftEnum,
  garageEnum,
  storiesEnum,
  RouteOptionProps,
  newRoute,
  formSchema,
  RouteFormData,
} from "@/schemas/routeForm.schema";
import { ContactForm } from "@/schemas/contactForm.schema";

//TODO:
//  - append an empty route when adding a new one
//  - address not changing if you delete a stop before it; requires page refresh to work

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
  const [bookingData, setBookingData] = useLocalStorage<ContactForm>(
    "contactInfo",
    {
      contactInformation: {
        "full-name": "",
        "phone-number": "",
        email: "",
      },
      "moving-from": "",
      "moving-to": "",
      consent: false,
      "crew-notes": "",
    },
  );

  console.log(bookingData);

  const [data, setData] = useLocalStorage<RouteFormData>("routesData", {
    routes: [
      { ...newRoute, address: bookingData["moving-from"] },
      { ...newRoute, address: bookingData["moving-to"] },
    ],
  });

  const form = useForm<RouteFormData>({
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
        if (values.routes.length > 1) {
          setData(values as RouteFormData);
          setBookingData({
            ...bookingData,
            "moving-from": values.routes[0]!.address!,
            "moving-to": values.routes[values.routes.length - 1]!.address!,
          });
        } else if (values.routes.length == 1) {
          setData(values as RouteFormData);
          setBookingData({
            ...bookingData,
            "moving-from": values.routes[0]!.address!,
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, setData, bookingData, setBookingData]);

  function onSubmit(values: RouteFormData) {
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
