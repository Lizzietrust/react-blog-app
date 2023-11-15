import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios.get('http://localhost:5000/blogs')
    .then((res) => {
      setData(res.data);
      console.log('blog data>>', data);
    }).catch((err) => {
      console.log('blog could not be fetched>>', err);
      toast.error('Something went wrong');
    })
  }

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + '...'
    }
    return str;
  }

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this blog?')) {
      axios.delete(`http://localhost:5000/blogs/${id}`)
      .then((res) => {
        toast.success('Blog Deleted Successfully');
        console.log('blog deleted>>', res);
        fetchBlogs();
      }).catch((err) => {
        console.log('Not successful>>', err);
        toast.error('Something went wrong');
      })
    }
  }

  return (
    <>
      {!data ? 
        <p>No Blog Found</p> :
        <div className='grid grid-cols-4 gap-8 mt-12 w-[90%] mx-auto'>
          {data.map((item, index) => (
            <Blogs key={index} {...item} excerpt={excerpt} handleDelete={handleDelete} />
          ))}
        </div>
      }
    </>
  )
}

export default Home
