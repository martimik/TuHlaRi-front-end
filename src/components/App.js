import React, { useState } from "react";
import axios from "axios";
import logo from "../logo.svg";

function App() {
    const [events, setEvent] = useState([]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <button onClick={getData}>Load</button>
                <div>
                    {events.map(event => (
                        <div
                            onClick={() =>
                                setEvent(
                                    events.filter(e => e._id !== event._id)
                                )
                            }
                            style={{ display: "flex" }}
                        >
                            <p className="id">{event._id}</p>
                            <p className="ip">{event.ip}</p>
                            <p className="date">{parseDate(event.date)}</p>
                        </div>
                    ))}
                </div>
            </header>
        </div>
    );

    function parseDate(time) {
        const d = new Date(time);
        return d.toString().slice(0, 24);
    }

    async function getData() {
        await axios
            .get("http://localhost:8080/events")
            .then(response => {
                setEvent(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

export default App;
