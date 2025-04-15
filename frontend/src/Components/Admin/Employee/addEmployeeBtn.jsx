import React, { useState } from 'react'

const addEmployeeBtn = () => {
    const [isModalOpen, setIsModalOpen] = useState()

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const department = [
        {label:"Select", value:"1"},
        {label:"Designing", value:"2"},
        {label:"Development", value:"3"},
        {label:"Social Media", value:"4"},
    ];
    const manager = [
        {name:"Select", value:"1"},
        {name:"Muhammad", value:"2"},
        {name:"Subhan", value:"3"},
        {name:"Chirag", value:"4"},
    ];

    const handleSelect = (e) => {
        setValue(e.target.value)
    }

  return (
    <div>
      <button onClick={toggleModal} className='bg-gray-600 text-white rounded-lg hover:bg-black hover:shadow cursor-pointer px-3 py-2'>
        Add New
    </button>
    {isModalOpen && (
        <>
            <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
            <form className='flex gap-6' action="">
            <div className='space-y-4'>
                                <div>
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        // value={editData.name}
                                        // onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        // value={editData.name}
                                        // onChange={(e) => setEditData({ ...editData, [e.target.name]: e.target.value })}
                                        className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone number:-</label>
                                    <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text">Address:-</label>
                                    <input 
                                    type="text" 
                                    id="address" 
                                    name="address"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text">Department:-</label>
                                    <select name="" id="" onChange={handleSelect}>
                                        {department.map((option) => 
                                        <option value={option.value}>{option.label}</option>
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="date">JoinDate:-</label>
                                    <input 
                                    type="date" 
                                    name="date" 
                                    id="date" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text">Manager:-</label>
                                    <select name="" id="" onChange={handleSelect}>
                                        {manager.map((select) => {
                                            <option value={select.value}>{select.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="text">gender:-</label>
                                    <select name="" id="">
                                        <option value="">Male</option>
                                        <option value="">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="text">Designation:-</label>
                                    <select name="" id="">
                                        <option value="">Select</option>
                                        <option value="">Grafics Designing</option>
                                        <option value="">Web Development</option>
                                        <option value="">Social Media</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="text">city:-</label>
                                    <input 
                                    type="text" 
                                    id="city" 
                                    name="city"
                                    className="w-full px-4 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text">Pincode:-</label>
                                    <input 
                                    type="text"
                                    name="Pin_Code"
                                    maxlength="6" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="text">Cours:-</label>
                                    <input 
                                    type="text"
                                    name="Pin_Code"
                                    maxlength="6" 
                                    />
                                </div>
            </div>
            <div>
                <div>
                    <h1>Education & Qualifications</h1>
                    <div>
                   <label htmlFor="education">Deegree Name</label>
                   <input type="text" />
                   </div>
                   <div>
                   <label htmlFor="education">Collage Name</label>
                   <input type="text" />
                   </div>
                   <div>
                   <label htmlFor="education">Graduation Year</label>
                   <input type="text" />
                   </div>
                </div>
                <div>
                </div>
            </div>
            </form>
            </div>
        </>
    )}
    </div>
  )
}

export default addEmployeeBtn