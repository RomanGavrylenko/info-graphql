import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import logo from './logo.svg';
import './App.css';

const query = gql`
    query {
      getUser {
        username
      }
    }
`;

function App() {
  
  const { data, loading, networkStatus, refetch} = useQuery(query, {
    pollInterval: 20000,
    notifyOnNetworkStatusChange: true,
  });
  console.log("🚀 ~ file: App.tsx ~ line 17 ~ App ~ networkStatus", networkStatus)
  
  console.log("🚀 ~ file: App.tsx ~ line 17 ~ App ~ data", loading, data)
  
  return (
    <div className="App">
      <button onClick={() => refetch()}>refetch button</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
