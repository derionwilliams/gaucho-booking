import BookNow from "./src/pages/BookNow";
import MoveDate from "./src/pages/MoveDate";
import Routes from "./src/pages/Routes";
import MovingDetails from "./src/pages/MovingDetails";
import Payment from "./src/pages/Payment";
import Supersize from "./src/pages/Supersize";
import Efficiency from "./src/pages/Efficiency";

function App() {
    const path = window.location.pathname;

    if (path.includes("book-now")) {
        return <BookNow />;
    } else if (path.includes("booking/move-date")) {
        return <MoveDate />;
    } else if (path.includes("booking/routes")) {
        return <Routes />;
    } else if (path.includes("booking/moving-details")) {
        return <MovingDetails />;
    } else if (path.includes("booking/supersize")) {
        return <Supersize />;
    } else if (path.includes("booking/efficiency")) {
        return <Efficiency />;
    } else if (path.includes("booking/payment")) {
        return <Payment />;
    }

    return <div> NULL PAGE</div>;
}

export default App;
