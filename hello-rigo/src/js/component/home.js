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
			tarea: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ tarea: e.target.value });
	}
	handleSubmit(e) {
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
	render() {
		return (
			<div className="container text-center">
				<form onSubmit={this.handleSubmit}>
					<h1>TODOLIST</h1>
					<input
						type="text"
						value={this.state.tarea}
						name="tarea"
						onChange={this.handleChange}
					/>
				</form>
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
