import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showData, setShowData] = useState(false);
  const [cache, setCache] = useState({});
  const fetchData = async () => {
    if (cache[input]) {
      setResults(cache[input]);
      console.log("cache called", input);
      return;
    }
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    console.log(data);
    const json = await data.json();
    setResults(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };
  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <div className="App">
      <h1>Auto Complete Search Bar</h1>
      <input
        className="input"
        type="text"
        placeholder="Enter recipe"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowData(true)}
        onBlur={() => setShowData(false)}
      />
      {showData && (
        <div className="results-container">
          {results.map((r) => (
            <span className="results" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
