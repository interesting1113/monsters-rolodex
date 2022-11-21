import { Component } from "react";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchFiled: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    const searchFiled = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchFiled };
    });
  };

  render() {
    const { monsters, searchFiled } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchFiled);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='search monsters'/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
