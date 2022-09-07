// import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
	const [searchString, setSearchString] = useState("");
	const [monsters, setMonsters] = useState([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	const onSearchChange = (event) => {
		const nameToSearch = event.target.value.toLowerCase();
		setSearchString(nameToSearch);
	};

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				return response.json();
			})
			.then((jsonObj) => {
				setMonsters(jsonObj);
			});
	}, []);

	useEffect(() => {
		const filteredResults = monsters.filter((monster) => {
			return monster.name.toLowerCase().includes(searchString);
		});
		setFilteredMonsters(filteredResults);
	}, [searchString, monsters]);

	return (
		<div className="App">
			<h1 className="app-title">Monster Rolodex</h1>
			<SearchBox
				className="search-box"
				onChangeHandler={onSearchChange}
				placeholder="Search Monster Here!!!"
			/>
			<CardList monsters={filteredMonsters} />
		</div>
	);
};

// class App extends Component {
// 	constructor() {
// 		super();

// 		this.state = { monsters: [], searchName: "" };
// 	}

// 	componentDidMount() {
// 		fetch("https://jsonplaceholder.typicode.com/users")
// 			.then((response) => {
// 				return response.json();
// 			})
// 			.then((jsonObj) => {
// 				this.setState(
// 					() => {
// 						return {
// 							monsters: jsonObj,
// 						};
// 					},
// 					() => {
// 						//this is the callback; executed after state has updated
// 					}
// 				);
// 			});
// 	}

// 	render() {
// 		const { monsters, searchName } = this.state;
// 		const { onSearchChange } = this;

// 		const filteredMonsters = monsters.filter((monster) => {
// 			return monster.name.toLowerCase().includes(searchName);
// 		});

// 		return (
// 			<div className="App">
// 				<h1 className="app-title">Monster Rolodex</h1>
// 				<SearchBox
// 					className="search-box"
// 					onChangeHandler={onSearchChange}
// 					placeholder="Search Monster Here!!!"
// 				/>
// 				<CardList monsters={filteredMonsters} />
// 			</div>
// 		);
// 	}
// }

export default App;
