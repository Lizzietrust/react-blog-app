import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import calendar from '../assets/calendar-icon.png'


const Blog = () => {
  const [blog, setBlog] = useState();
  const {id} = useParams();

  useEffect(() => {
    if(id) {
      getSingleBlog();
    };
  }, [id]);

  const getSingleBlog = () => {
    axios.get(`http://localhost:5000/blogs/${id}`)
    .then((res) => {
      console.log('Single blog>>', res);
      setBlog(res.data);
    }).catch((err) => {
      console.log('Could not fetch single blog>>', err);
      toast.error('Something went wrong');
    })
  }

  // function getBackgroundColor(category){
  //   const backgroundColorByStatus = {
  //     fitness: '#cc201b',
  //     food: '#ebe534',
  //     tech: '#eb3483',
  //     fashion: '#2d2daf',
  //     travel: '#45aa45',
  //     sports: '#030221'
  //   }
  
  //   return backgroundColorByStatus[category];
  // }

  return (
    <div className='w-[90%] mx-auto my-8'>
      <Link to='/' className='absolute'>Go Home</Link>
      <h2 className='text-center font-bold text-[32px]'>{blog && blog.title}</h2>
      <img className='w-full h-[600px] object-cover mx-auto my-12 rounded-xl' src={blog && blog.imageLink} alt={blog && blog.category} />
      <div>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-1'>
            <img src={calendar} alt="" />
            {blog && 
              <p className=''>{blog.date}</p>
            }
          </div>

          
          {blog && 
            <div 
              className={
                blog.category === "fitness"
                  ? "fitBadge"
                  : blog.category === "food"
                  ? "foodBadge"
                  : blog.category === 'tech'
                  ? 'techBadge'
                  : blog.category === 'fashion'
                  ? 'fashionBadge'
                  : blog.category === 'travel'
                  ? 'travelBadge'
                  : "sportBadge"
                }
              >
                {blog.category}
            </div>
          }
        </div>

        <div className='mt-6'>
          <p className='font-medium leading-6 text-gray-950'>{blog && blog.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Blog
