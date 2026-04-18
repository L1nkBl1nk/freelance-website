import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from "../main"
import { Row, Spinner } from "react-bootstrap"
import BidItem from "./BidItem"
import { getBids } from "../http/userApi"

const BidList = observer(() => {
    const { user } = useContext(Context)
    const [bids, setBids] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getBids(user.user.id)
            .then(data => setBids(data))
            .catch(e => setError(e.message))
    }, [user.user.id])

    if (error) return <p className="text-danger">{error}</p>
    if (!bids) return <Spinner animation="border" variant="primary" className="mt-3" />
    if (!bids.length) return <p className="text-muted mt-3">You have no bids yet.</p>

    return (
        <Row>
            {bids.map(b => (
                <BidItem key={b.id} bid={b} />
            ))}
        </Row>
    )
})

export default BidList