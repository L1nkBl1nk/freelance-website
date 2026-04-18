import { Container } from "react-bootstrap"
import BidList from "../components/BidList"

const Bids = () => {
    return (
        <Container className="py-4">
            <h2 className="fw-bold mb-4">Your Bids</h2>
            <BidList />
        </Container>
    )
}

export default Bids
