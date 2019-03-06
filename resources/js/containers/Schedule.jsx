import * as React from 'react';
import {getSchedules, saveSchedule} from "../modules/schedules";

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            schedules: [],
            schedule: {
                start_date: '',
                title: '',
                body: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        getSchedules().then((data) => {
            this.setState({
                schedules: data.schedules
            })
        })
    }

    handleChange(name, value) {
        const newSchedule = Object.assign({}, this.state.schedule);

        newSchedule[name] = value;

        this.setState({
            schedule: newSchedule
        })
    }

    handleSubmit() {
        saveSchedule(this.state.schedule).then((data) => {
            this.setState({
                schedules: data.schedules,
                schedule: {
                    start_date: '',
                    title: '',
                    body: '',
                }
            })
        })
    }

    render() {
        const {schedules, schedule} = this.state;

        return (
            <div>
                <div>
                    <input
                        type={'date'}
                        name={'start_date'}
                        value={schedule.start_date}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                    />
                    <input
                        type={'text'}
                        name={'title'}
                        value={schedule.title}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                    />
                    <input
                        type={'text'}
                        name={'body'}
                        value={schedule.body}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                    />
                    <button onClick={this.handleSubmit}>保存する</button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>date</th>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules && schedules.map((schedule, i) => (
                        <tr key={i}>
                            <td>{schedule.start_date}</td>
                            <td>{schedule.title}</td>
                            <td>{schedule.body}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
};


export default Schedule;
