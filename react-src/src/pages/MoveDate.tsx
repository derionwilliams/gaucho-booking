import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import useLocalStorage from "use-local-storage";

type CustomDayProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    day: {
        date: Date;
    };
    setter: (date: Date) => void;
};

function CustomDay({ day, setter, ...buttonProps }: CustomDayProps) {
    return (
        <button
            {...buttonProps}
            className="bg-secondary aria-selected:bg-red-50"
            onClick={() => setter(day.date)}
        >
            <div>{`${day.date.getDate()}`}</div>
            <div>$149</div>
        </button>
    );
}

function MoveDate() {
    const [dateInfo, setDateInfo] = useLocalStorage<{
        "selected-date": Date;
        time: string;
    }>("dateInfo", {
        "selected-date": new Date(),
        time: "",
    });

    const setDate = (date: Date) => {
        setDateInfo((prev) => ({
            time: prev!.time,
            "selected-date": date,
        }));
    };

    function nextPage() {
        window.location.assign("/booking/routes");
    }
    return (
        <>
            <div>
                <h2>What day do you plan on moving?</h2>
                <p>We're flexible so you can always change this later</p>
            </div>
            <Calendar
                mode="single"
                selected={dateInfo["selected-date"]}
                onSelect={setDate}
                required={true}
                components={{
                    DayButton: (props) => <CustomDay {...props} setter={setDate} />,
                }}
                className="rounded-md border"
                footer={
                    dateInfo["selected-date"] ? (
                        `AM or PM module for ${dateInfo["selected-date"]}`
                    ) : (
                        <></>
                    )
                }
            />
            <Button type="button" onClick={nextPage}>
                Next
            </Button>
        </>
    );
}
export default MoveDate;
