// import { Component } from "react";
import { useState, useEffect } from "react";

import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchFiled, setSearchField] = useState(""); // [value, setValue]
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchFiled);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchFiled]);

  const onSearchChange = (event) => {
    const searchFiledString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFiledString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchFiled: "",
//     };
//   }

//   componentDidMount() {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onSearchChange = (event) => {
//     const searchFiled = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchFiled };
//     });
//   };

//   render() {
//     const { monsters, searchFiled } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchFiled);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Monsters Rolodex</h1>
//         <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='search monsters'/>
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
