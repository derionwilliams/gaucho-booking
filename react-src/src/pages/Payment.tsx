import useLocalStorage from "use-local-storage";
import { z } from "zod";

const contactSchema = z.object({
    "first-name": z.string().min(2).max(50),
    "last-name": z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    "phone-number": z.string().min(2).max(50),
    "crew-notes": z.string().max(2200),
});

function Payment() {
    // const [bookingData, setBookingData] = useLocalStorage("bookingData", "");

    return (
        <div>
            <h1>Complete and reserve your crew. Fully refundable.</h1>
            <div>
                <h2>Reservation Summary</h2>
                <h3>Moving Reservation</h3>
                <p>Apr 23, 2025 at 8 AM</p>
                <div>
                    <div>3401 Ocee St, Houston, TX 77063</div>
                    <div>3000 Woodland Park Dr, Houston, TX 77082</div>
                    <div>
                        <div>$189/hr + $99 Travel Fee for crew of 3</div>
                    </div>
                    <div>
                        <h2>Contact Information</h2>

                        <div>
                            <h2>Pricing Information</h2>
                        </div>
                    </div>
                    <div>
                        <h2>Billing Information</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
