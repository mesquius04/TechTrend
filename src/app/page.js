'use client';
import "../styles/globals.css";
import { useEffect, useState } from 'react';
import AddRandomDataButton from '../components/AddRandomData';

export default function Home() {
  const [trends, setTrends] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [worstMonthly, setWorstMonthly] = useState([]);
  const [todaytrends, setTodayTrends] = useState([]);

  const fetchTrends = () => {
    fetch('/api/trending')
      .then(res => res.json())
      .then(data => setTrends(data));
  };
  const fetchMonthly = () => {
    fetch('/api/month')
      .then(res => res.json())
      .then(data => setMonthly(data));
  };
  const fetchWorstMonthly = () => {
    fetch('/api/month_worst')
      .then(res => res.json())
      .then(data => setWorstMonthly(data));
  };
  const fetchTodayTrends = () => {
    fetch('/api/today')
      .then(res => res.json())
      .then(data => setTodayTrends(data));
  };

  useEffect(() => {
    fetchTodayTrends();
    fetchMonthly();
    fetchTrends();
    fetchWorstMonthly();
  }, []);

  return (
    <div id ="main_container">
      <h1 id ="title">Trending Technologies</h1>
      <AddRandomDataButton onSuccess={{fetchTrends, fetchMonthly, fetchWorstMonthly, fetchTodayTrends}} />
      <div id="big_container">
        <div className="small_container">
          <h3 id = "cat_title">Top Trends This Month</h3>
          <ul id = "list">
            {trends.map((t, i) => (
              <li id = "list_element" key={i}>{i + 1}. {t._id}: {t.count}</li>
            ))}
          </ul>
        </div>
        <div className="small_container">
          <h3 id = "cat_title">Trending Today</h3>
          <ul id = "list">
            {todaytrends.map((t, i) => (
              <li id = "list_element" key={i}>{i + 1}. {t._id}: {t.count}</li>
            ))}
          </ul>
        </div>
        <div className="small_container">
          <h3 id = "cat_title">Month Trending Spikes</h3>
          <ul id = "list">
          {monthly.map((t, i) => (
            <li id="list_element" key={i}>
              {i + 1}. {t.technology}: {t.counts.thisMonth ?? 0}
              {t.increase > 0 && (
                <span style={{ color: 'lightgreen', marginLeft: '8px' }}>
                  (+{t.increase})
                </span>
              )}
              {t.increase < 0 && (
                <span style={{ color: 'lightred', marginLeft: '8px' }}>
                  ({t.increase})
                </span>
              )}
            </li>
          ))}
          </ul>
        </div>  
        <div className="small_container">
          <h3 id = "cat_title">Month Lowest Activity</h3>
          <ul id = "list">
          {worstMonthly.map((t, i) => (
            <li id="list_element" key={i}>
              {i + 1}. {t.technology}: {t.counts.thisMonth ?? 0}
              {t.increase > 0 && (
                <span style={{ color: 'lightgreen', marginLeft: '8px' }}>
                  (+{t.increase})
                </span>
              )}
              {t.increase < 0 && (
                <span style={{ color: 'red', marginLeft: '8px' }}>
                  ({t.increase})
                </span>
              )}
            </li>
          ))}
          </ul>
        </div>   
      </div>
    </div>
  );
}
