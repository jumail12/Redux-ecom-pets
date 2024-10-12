import React from 'react'
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const nav=useNavigate();

    const dogP=()=>{
      nav("/dog");
    }
  
    const catP=()=>{
      nav("/cat");
    }
  return (
    <div className='p-4 bg-gray-200 rounded-lg  shadow-md max-w-auto mx-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Shop For.</h1>
      
      <div className='flex flex-wrap gap-12 justify-center'>

        <div className='flex-1 min-w-[120px] max-w-[150px] cursor-pointer' onClick={dogP}>
          <img
            src='https://cdn.petsathome.com/public/images/assets/dog-category/dog-avatar.png'  // Replace with your image URL
            alt='Dog'
            className='w-full h-auto rounded-md shadow-md  bg-black p-3'
          />
          <h3 className='text-lg font-semibold mt-2 text-center'>Dog</h3>
        </div>

        <div className='flex-1 min-w-[120px] max-w-[150px] cursor-pointer' onClick={catP} >
          <img
            src='https://cdn.petsathome.com/public/images/assets/cat-category/cat-avatar.png'  // Replace with your image URL
            alt='Cat'
            className='w-full h-auto rounded-md shadow-xl bg-black p-3'
          />
          <h3 className='text-lg font-semibold mt-2 text-center'>Cat</h3>
        </div>

      </div>
    </div>
  )
}

export default Category