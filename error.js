import React from 'react';
import { Button } from 'react-bootstrap';
class App extends React.Component {
    render() {
        return (
            <div className="error_page">
                <h2 className="err_page_label">Opps page not found!</h2>
                <Button className="btn_load" onClick={() => window.location.href = `/`}>Go back</Button>
            </div>

        )
    }
}

export default App

