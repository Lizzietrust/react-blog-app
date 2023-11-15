import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

const initials = {
  title: "",
  description: "",
  category: "",
  imageLink: ""
}

const options = ["travel", "fashion", "fitness", "sports", "food", "tech"];

//kfn5sxbo

const AddEdit = () => {
  const [formInputData, setFormInputData] = useState(initials);
  const [categoryError, setCategoryError] = useState(null);
  const [errors, setErrors] = useState({});
  const [editState, setEditState] = useState(false);

  const { title, description, category, imageLink } = formInputData;

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    if(id) {
      setEditState(true);
      getSingleBlog(id);
    } else {
      setEditState(false);
      setFormInputData({...initials});
    }
  }, [id]);

  const getSingleBlog = (id) => {
    axios.get(`http://localhost:5000/blogs/${id}`)
    .then((res) => {
      setFormInputData({...res.data});
      console.log('edit blog data>>', res);
    }).catch((err) => {
      toast.error('Something went wrong');
    })
    
  }

  const getDate = () => {
    let blogDate = new Date();
    let day = String(blogDate.getDate()).padStart(2, '0');
    let month = String(blogDate.getMonth() + 1).padStart(2, '0');
    let year = blogDate.getFullYear();


    blogDate = day + '/' + month + '/' + year;
    return blogDate;
  }

  const navigateHome = () => {
    navigate('/');
  }
  
  const handleChange = (e) => {
    let {name, value} = e.target;
    setFormInputData({...formInputData, [name]: value});
    console.log(formInputData);
  }

  const onUploadImage = (file) => {
    console.log('file>>', file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kfn5sxbo');

    axios.post('http://api.cloudinary.com/v1_1/do3peojms/image/upload', formData)
    .then((res) => {
      console.log('response>>', res);
      toast.info('Image uploaded successfully');
      setFormInputData({...formInputData, imageLink: res.data.url});
      console.log(formInputData);
    }).catch((err) => {
      console.log('error>>', err);
      toast.error('Image upload failed');
    });
  }

  const categoryChange = (e) => {
    setFormInputData({...formInputData, category: e.target.value});
    console.log(formInputData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!formInputData.title) {
      validationErrors.title = "Title field cannot be empty"
    }

    if (!formInputData.description) {
      validationErrors.description = "Description field cannot be empty"
    }

    if (!formInputData.category) {
      validationErrors.category = "Category field cannot be empty"
    }

    if (!formInputData.imageLink) {
      validationErrors.imageLink = "Image field cannot be empty"
    }

    setErrors(validationErrors);
    const imageValidation = !editState ? imageLink : true;
    if (title && description && category && imageLink ) {
      console.log('validated');

      const currentDate = getDate();

      if(!editState) {
        const fullBlogData = { ...formInputData, date: currentDate };
        axios.post('http://localhost:5000/blogs', fullBlogData)
        .then((res) => {
          console.log('response>>', res);
          toast.success('Blog successfully created');
        }).catch((err) => {
          console.log('error>>', err);
          toast.error('Something went wrong');
        });
      } else {
        axios.put(`http://localhost:5000/blogs/${id}`, formInputData)
        .then((res) => {
          console.log('Edited response>>', res);
          toast.success('Blog successfully updated');
        }).catch((err) => {
          console.log('error>>', err);
          toast.error('Something went wrong');
        });
      }

      setFormInputData({title: '', description: '', category: '', imageLink: ''});
      navigate('/');
    }
  }
  
  return (
    <div className='my-12'>
      <h3 className='text-center font-semibold text-[28px] mb-6'>{editState ? 'Edit Blog' : 'Add Blog'}</h3>

      <form onSubmit={handleSubmit} className='bg-[#736f66] p-6 mx-auto w-[600px]'>
        <div className='flex flex-col mb-4'>
          <label htmlFor="title" className='mb-2 text-[16px] text-white font-medium'>Title</label>
          <input type="text" name="title" id="" value={title || ""} onChange={handleChange}
           className='bg-[#fff] p-3 border-none outline-none' />
          {errors.title && <span className='text-[#cc201b]'>{errors.title}</span>}
        </div>

        <div className='flex flex-col mb-4'>
          <label htmlFor="description" className='mb-2 text-[16px] text-white font-medium'>Description</label>
          <textarea name="description" value={description || ""} id="" onChange={handleChange} cols="30" rows="4"
            className='bg-[#fff] p-3 border-none outline-none'></textarea>
          {errors.description && <span className='text-[#cc201b]'>{errors.description}</span>}
        </div>

        {!editState && 
          <div className='flex flex-col mb-4'>
            <label htmlFor="imageLink" className='mb-2 text-[16px] text-white font-medium'>Image</label>
            <input type="file" id="image" 
              onChange={(e) => onUploadImage(e.target.files[0])} />
            {errors.imageLink && <span className='text-[#cc201b]'>{errors.imageLink}</span>}
          </div>
        }
        
        <div className='flex flex-col mb-4'>
          <label htmlFor="categories" className='mb-2 text-[16px] text-white font-medium'>Categories</label>
          <select name="" id="" onChange={categoryChange} value={category}
            className='bg-[#fff] text-black border-none outline-none focus:ring-blue-500  block w-full p-3 dark:bg-[#fff] dark:text-black dark:focus:ring-blue-500'>
            <option selected>Choose a category</option>
            {options.map((option, index) => (
              <option value={option || ""} key={index}>{option}</option>
            ))}
          </select>
          {errors.category && <span className='text-[#cc201b]'>{errors.category}</span>}
        </div>

        <button className='w-full mt-6 bg-[#2d2daf] h-14 text-white font-bold' type='submit'>{editState ? 'EDIT' : 'ADD'}</button>
        <button className='w-full mt-6 bg-[#cc201b] h-14 text-white font-bold' onClick={navigateHome}>BACK</button>
      </form>
    </div>
  )
}

export default AddEdit 
