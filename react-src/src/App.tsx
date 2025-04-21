import "./App.css";
import BookNow from "./pages/BookNow";
import MoveDate from "./pages/MoveDate";
import Routes from "./pages/Routes";
import MovingDetails from "./pages/MovingDetails";
import Payment from "./pages/Payment";
import Supersize from "./pages/Supersize";
import Efficiency from "./pages/Efficiency";

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
