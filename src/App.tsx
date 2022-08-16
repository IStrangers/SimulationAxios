import './App.css';
import { axios } from './axios';

function App() {

  const testAxios = () => {
    axios({
      url: "http://localhost:8848/test?www=123",
      method: "get",
      headers: {
      },
      data: {
        "name": "挖的"
      },
      timeout: 1000
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={testAxios}
        >
          Test Axios
        </button>
      </header>
    </div>
  );
}

export default App;
