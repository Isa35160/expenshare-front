import React, {Component} from 'react';
import {Container} from "reactstrap";
import { Chart } from "react-charts";

class DashBoard extends Component {

    render() {
        return (
            <div>

                <div>
                    <Container>
                        <h1>{this.props.match.slug}</h1>

                        <h3>DashBoard</h3>
                        <div
                            style={{
                                width: "300px",
                                height: "250px"
                            }}
                        >
                            <Chart
                                data={[
                                    {
                                        label: "Series 1",
                                        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
                                    },
                                    {
                                        label: "Series 2",
                                        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
                                    }
                                ]}
                                axes={[
                                    { primary: true, type: "linear", position: "bottom" },
                                    { type: "linear", position: "left" }
                                ]}
                            /><br/>
                            <Chart
                                data={[
                                    {
                                        label: "Series 1",
                                        data: [[0, 2], [1, 4], [2, 1], [3, 5], [4, 8]]
                                    },
                                    {
                                        label: "Series 2",
                                        data: [[0, 1], [1, 2], [2, 4], [3, 3], [4, 1]]
                                    }
                                ]}
                                axes={[
                                    { primary: true, type: "linear", position: "bottom" },
                                    { type: "linear", position: "left" }
                                ]}
                            />
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default DashBoard;