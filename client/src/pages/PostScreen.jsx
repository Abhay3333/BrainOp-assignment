import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

const Post = ({ post }) => (
  <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
    <h3 className="text-gray-800 font-bold mb-2">{post.title}</h3>
    <p className="text-gray-600">{post.body}</p>
  </div>
);

const PostListScreen = () => {
  const { logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}?_start=${posts.length}&_limit=10`);
      const newPosts = response.data;
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasMore(newPosts.length > 0);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Post Screen</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-all duration-300"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        {isLoading && (
          <div className="text-center mt-8">
            <div className="inline-block rounded-full border-4 border-gray-800 border-dashed animate-spin h-12 w-12"></div>
          </div>
        )}
        <div ref={observerRef} className="h-4"></div>
      </div>
    </div>
  );
};

export default PostListScreen;
