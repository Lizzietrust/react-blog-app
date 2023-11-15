import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Blogs = ({title, category, id, description, imageLink, excerpt, handleDelete}) => {

    function getBackgroundColor(category){
        const backgroundColorByStatus = {
          fitness: '#cc201b',
          food: '#ebe534',
          tech: '#eb3483',
          fashion: '#2d2daf',
          travel: '#45aa45',
          sports: '#030221'
        }
      
        return backgroundColorByStatus[category];
    }
    
    
  return (
    <div className='h-[420px] w-full shadow-lg rounded-br-xl rounded-bl-xl'>
        <div className='w-full h-[160px] '>
            <img src={imageLink} alt={title} className='w-full h-full object-cover rounded-tl-xl rounded-tr-xl' />
        </div>
        <div className='p-5'>
            <h2 className='text-center font-bold text-xl'>{title}</h2>
            <p className='text-center pt-3'>
                {excerpt(description)}
                <Link to={`/blog/${id}`} className='underline font-medium pl-1'>Read More</Link>
            </p>
            <div className='uppercase text-center mt-4 font-bold text-white p-2 w-3/5 mx-auto mb-2'
             style={{'backgroundColor': getBackgroundColor(category)}}>
                {category}
            </div>
            <div className='flex mt-5 items-center justify-between'>
                <button onClick={() => handleDelete(id)} className='h-[36px] w-[45%] bg-[#cc201b] text-white rounded-md'>Delete</button>
                <Link to={`/edit/${id}`} className='h-[36px] w-[45%] bg-[#45aa45] text-white rounded-md flex items-center justify-center'>Edit</Link>
            </div>
        </div>
    </div>
  )
}

export default Blogs
