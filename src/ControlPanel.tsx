import React, { Component } from 'react'; // let's also import Component
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ControlPanelState = {
    time: Date
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class ControlPanel extends Component<{}, ControlPanelState> {

    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    tick() {
        this.setState({
            time: new Date()
        });
    }

    // Before the component mounts, we initialise our state
    componentWillMount() {
        this.tick();
    }

    // After the component did mount, we set the state each second.
    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }

    // render will know everything!
    render() {
        return (
        <div>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Control placeholder="Type command here..." />
                    </Col>
                    <Col>
                        <Button type="button">Submit</Button>
                    </Col>
                </Form.Row>
            </Form>
        </div>
        );
    }
}