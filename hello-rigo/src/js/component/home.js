import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Tareas } from "./tareas";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			tareas: [],
			tarea: "",
			username: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.saveTasks = this.saveTasks.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitForUser = this.handleSubmitForUser.bind(this);
		this.handleChangeUser = this.handleChangeUser.bind(this);
	}

	componentDidMount() {
		this.getUserList();
	}
	getUserList() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user" +
				this.state.username
		)
			.then(resp => {
				console.log(resp.ok);
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}
	handleSubmitForUser(e) {
		e.preventDefault();
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" +
				this.state.username,
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.then(error => console.log(error));
	}

	handleChangeUser(e) {
		this.setState({
			username: e.target.value
		});
	}

	handleChange(e) {
		this.setState({ tarea: e.target.value });
	}
	handleSubmit(e) {
		let saveTareas = [];
		e.preventDefault();
		this.setState({
			tareas: this.state.tareas.concat(this.state.tarea),
			tarea: ""
		});
	}

	deleteItem(e, i) {
		console.log(i);
		let { tareas } = this.state;
		tareas.splice(i, 1);
		this.setState({
			tareas: tareas
		});
	}

	saveTasks() {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/" +
				this.state.username,
			{
				method: "PUT",
				body: JSON.stringify(
					this.state.tareas.map(item => ({
						label: item,
						done: false
					}))
				),
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.then(error => console.log(error));
	}

	render() {
		return (
			<div className="container text-center">
				<h1>TODOLIST</h1>
				<form onSubmit={this.handleSubmitForUser}>
					<input
						type="text"
						value={this.state.username}
						name="username"
						onChange={this.handleChangeUser}
						placeholder="Username"
					/>
				</form>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						value={this.state.tarea}
						name="tarea"
						onChange={this.handleChange}
						placeholder="Task"
					/>
				</form>
				<button id="button" onClick={this.saveTasks}>
					Save Tasks
				</button>
				<ul>
					{this.state.tareas.map((item, i) => (
						<li key={i}>
							{" "}
							{item}
							<button onClick={e => this.deleteItem(e, i)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
