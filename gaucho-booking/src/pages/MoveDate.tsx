import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import type {
    DayContentProps,
    SelectSingleEventHandler,
} from "react-day-picker";
import useLocalStorage from "use-local-storage";

//Todo: change the logic for the initalized date object in storage to use availability from the dashboard

function CustomDayContent({ date }: DayContentProps) {
    const price = 179;

    return (
        <div className="flex flex-col items-center justify-center m-2">
            <span className="text-sm">{date.getDate()}</span>
            {price != null && (
                <span className=" inline-flex">
                    <span className="text-[10px]">$</span>
                    <span className="text-sm">{price}</span>
                    <span className=" text-[10px] mt-1">{"/hr"}</span>
                </span>
            )}
        </div>
    );
}

function MoveDate() {
    const [dateInfo, setDateInfo] = useLocalStorage<{
        "selected-date": Date;
        time: string;
    }>("dateInfo", {
        "selected-date": new Date(),
        time: "AM",
    });

    const [blockedDates, setBlockedDates] = useState<Date[]>([]);

    const setDate: SelectSingleEventHandler = (date) => {
        if (!date) return;
        setDateInfo((prev) => ({
            time: prev!.time,
            "selected-date": date,
        }));
    };

    const toggleTime = () => {
        if (dateInfo.time == "AM") {
            setDateInfo({ ...dateInfo, time: "PM" });
        } else {
            setDateInfo({ ...dateInfo, time: "AM" });
        }
    };

    function nextPage() {
        window.location.assign("/booking/routes");
    }
    return (
        <div>
            <div className=" min-[1240px] max-w-xl">
                <div>
                    <h2>What day do you plan on moving?</h2>
                    <p>We're flexible so you can always change this later</p>
                </div>
                <Calendar
                    mode="single"
                    selected={dateInfo["selected-date"]}
                    onSelect={setDate}
                    required={true}
                    components={{ DayContent: CustomDayContent }}
                    className=" rounded-md border"
                    disabled={[{ before: new Date() }, ...blockedDates]}
                />
                <div className=" inline w-full">
                    <div className=" block align-middle">
                        <Button
                            onClick={toggleTime}
                            variant={dateInfo.time == "AM" ? "default" : "outline"}
                        >
                            Select AM
                        </Button>
                        <Button
                            onClick={toggleTime}
                            variant={dateInfo.time == "PM" ? "default" : "outline"}
                        >
                            Select PM
                        </Button>
                    </div>
                    <div className=" row justify-center">
                        <div>
                            <p>Your move will start between 8am and 10am.</p>
                        </div>
                        <div className=" col">
                            <p>PM moves start after our movers complete their AM move.</p>
                        </div>
                    </div>
                </div>
                <Button type="button" onClick={nextPage}>
                    Next
                </Button>
            </div>
            <div className=""></div>
        </div>
    );
}
export default MoveDate;
