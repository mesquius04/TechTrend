'use client';
import "../styles/globals.css";
import { useEffect, useState } from 'react';
import AddRandomDataButton from '../components/AddRandomData';

export default function Home() {
  const [trends, setTrends] = useState([]);

  const fetchTrends = () => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => setTrends(data));
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div id ="main_container">
      <h1 id ="title">Trending Today</h1>
      <AddRandomDataButton onSuccess={fetchTrends} />
      <h3 id = "cat_title">By Popularity</h3>
      <ul id = "list">
        {trends.map((t, i) => (
          <li id = "list_element" key={i}>{i + 1}. {t._id}: {t.count}</li>
        ))}
      </ul>
    </div>
  );
}
