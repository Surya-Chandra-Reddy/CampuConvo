import React, { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { TiEdit } from 'react-icons/ti';

function InputEdit({ type, handleChange, input, handleSubmit }) {
  const [editable, setEditable] = useState(false);

  const toggleEditable = () => {
    setEditable(!editable);
  };

  return (
    <>
      <div className='py-4 mt-4 bg-white shadow-md px-4 gap-y-3'>
        <div className='flex flex-col'>
          <p className='text-lg font-semibold text-gray-700'>{type === 'name' ? 'Name' : 'Bio'}</p>
          <div className='flex justify-between items-center'>
            {!editable ? (
              <div className='flex items-center'>
                <p className='text-sm text-gray-800'>{input}</p>
                <button onClick={toggleEditable}>
                  <TiEdit className='w-6 h-6 ml-2 text-gray-600 cursor-pointer hover:text-blue-500 place-content: flex-end;' />
                </button>
              </div>
            ) : (
              <div className='flex items-center'>
                <input
                  name={type}
                  onChange={handleChange}
                  className='text-lg text-gray-800 outline-none ml-2 w-[150px]'
                  type='text'
                  value={input}
                />
              </div>
            )}
            {editable && (
              <button onClick={handleSubmit} className='text-blue-500'>
                <BsCheck className='w-6 h-6' />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default InputEdit;