import React, { useEffect, useMemo, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import useExportData from '../hooks/useExportData';
import Comments from './Comments';
import SubredditSelector from './SubredditSelector';
import DataVisualization from './DataVisualization';
import WidgetA from './widgets/WidgetA';
import WidgetB from './widgets/WidgetB';
import WidgetC from './widgets/WidgetC';
import D3Chart from './D3Chart';
import PostInsights from './PostInsights';
import EngagementDashboard from './EngagementDashboard';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './styles/Dashboard.css';
import './styles/WidgetA.css';
import './styles/WidgetB.css';
import './styles/WidgetC.css';
import { fetchPosts } from '../redux/actions/postActions';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const { posts, loading, error } = useSelector(state => state.posts);
  const [subreddit, setSubreddit] = useState('reactjs');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('upvotes');

  // useMemo used for sorting posts
  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      switch (sort) {
        case 'upvotes': return b.data.ups - a.data.ups;
        case 'comments': return b.data.num_comments - a.data.num_comments;
        case 'date': return new Date(b.data.created_utc * 1000) - new Date(a.data.created_utc * 1000);
        default: return 0;
      }
    });
  }, [posts, sort]);

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 };

  // Define the layout for each breakpoint
  const [layout, setLayout] = useState({
    lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 1, h: 2 },
      { i: 'c', x: 2, y: 0, w: 1, h: 2 },
      { i: 'd', x: 3, y: 0, w: 1, h: 2 },
      { i: 'e', x: 0, y: 2, w: 1, h: 2 },
      { i: 'f', x: 1, y: 2, w: 1, h: 2 },
      { i: 'g', x: 2, y: 2, w: 1, h: 2 },
      { i: 'h', x: 3, y: 2, w: 1, h: 2 }
    ],
    md: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 1, h: 2 },
      { i: 'c', x: 2, y: 0, w: 1, h: 2 },
      { i: 'd', x: 0, y: 2, w: 1, h: 2 },
      { i: 'e', x: 1, y: 2, w: 1, h: 2 },
      { i: 'f', x: 2, y: 2, w: 1, h: 2 },
      { i: 'g', x: 0, y: 4, w: 1, h: 2 },
      { i: 'h', x: 1, y: 4, w: 1, h: 2 }
    ],
    sm: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 0, y: 2, w: 1, h: 2 },
      { i: 'c', x: 0, y: 4, w: 1, h: 2 },
      { i: 'd', x: 0, y: 6, w: 1, h: 2 },
      { i: 'e', x: 0, y: 8, w: 1, h: 2 },
      { i: 'f', x: 0, y: 10, w: 1, h: 2 },
      { i: 'g', x: 0, y: 12, w: 1, h: 2 },
      { i: 'h', x: 0, y: 14, w: 1, h: 2 }
    ],
    xs: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 0, y: 2, w: 1, h: 2 },
      { i: 'c', x: 0, y: 4, w: 1, h: 2 },
      { i: 'd', x: 0, y: 6, w: 1, h: 2 },
      { i: 'e', x: 0, y: 8, w: 1, h: 2 },
      { i: 'f', x: 0, y: 10, w: 1, h: 2 },
      { i: 'g', x: 0, y: 12, w: 1, h: 2 },
      { i: 'h', x: 0, y: 14, w: 1, h: 2 }
    ],
    xxs: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 0, y: 2, w: 1, h: 2 },
      { i: 'c', x: 0, y: 4, w: 1, h: 2 },
      { i: 'd', x: 0, y: 6, w: 1, h: 2 },
      { i: 'e', x: 0, y: 8, w: 1, h: 2 },
      { i: 'f', x: 0, y: 10, w: 1, h: 2 },
      { i: 'g', x: 0, y: 12, w: 1, h: 2 },
      { i: 'h', x: 0, y: 14, w: 1, h: 2 }
    ]
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [subreddit, dispatch]);

  const handleLayoutChange = (newLayout) => {
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout));
    setLayout(newLayout);
  };

  const handleSubredditChange = (newSubreddit) => {
    setSubreddit(newSubreddit);
  };

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSortChange = (e) => setSort(e.target.value);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <ResponsiveGridLayout
        className="layout"
        layouts={layout}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
      >
        <div key="a"> 
          <SubredditSelector onChange={handleSubredditChange} />
          <div className="filters">
            <label>
              Filter by time:
              <select value={filter} onChange={handleFilterChange}>
                <option value="all">All time</option>
                <option value="hour">Past hour</option>
                <option value="day">Past day</option>
                <option value="week">Past week</option>
                <option value="month">Past month</option>
                <option value="year">Past year</option>
              </select>
            </label>
            <label>
              Sort by:
              <select value={sort} onChange={handleSortChange}>
                <option value="upvotes">Upvotes</option>
                <option value="comments">Comments</option>
                <option value="date">Date</option>
              </select>
            </label>
          </div>
        </div>
        <div key="b"> 
          {sortedPosts.length > 0 ? (
            <ul>
              {sortedPosts.map(post => (
                <li key={post.data.id}>
                  <h3>{post.data.title}</h3>
                  <Comments subreddit={post.data.subreddit} postId={post.data.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts found</p>
          )}
        </div>
        <div key="c"> 
          <DataVisualization data={sortedPosts} />
        </div>
        <div key="d"> 
          <WidgetA />
        </div>
        <div key="e"> 
          <WidgetB />
        </div>
        <div key="f"> 
          <WidgetC totalPosts={posts.length} />
        </div>
        <div key="g"> 
          <D3Chart data={sortedPosts} />
        </div>
        <div key="h"> 
          <PostInsights />
        </div>
      </ResponsiveGridLayout>
    </div>
  );  
};

export default Dashboard; 
