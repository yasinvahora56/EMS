import { useState } from "react"
import { IoIosCloseCircle } from "react-icons/io";



const CreatNewBtn = () => {


    const [modal, setModal] = useState(false);

    const ToggleModal = () =>{
        setModal(!modal);
    }


  return (

    <>
    <div>
        <button className="absolute top-80 right-100 px-3 py-2 bg-gray-50 border-1 text-black rounded-md cursor-pointer" onClick={ToggleModal}>Add New</button>
    </div>

    {modal && (
      <div className="fixed inset-0 bg-gray-500 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Modal Header */}
        <h1 className="text-lg font-bold mb-4">Add New Employee</h1>

        {/* Close Button */}
        <button
          onClick={ToggleModal}
          className="absolute top-2 right-2 text-gray-500 font-bold"
        >
          <IoIosCloseCircle className="w-7 h-7 cursor-pointer"/>
        </button>

        {/* Modal Content */}
        <div className="space-y-4">
          <div>
            <label htmlFor="image" className="block font-medium">
              Image
            </label>
            <input
              type="file"
              name="image"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label htmlFor="designation" className="block font-medium">
              Designation
            </label>
            <select
              name="designation"
              className="border p-2 rounded w-full"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Marketing">Marketing</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Gender</label>
            <div className="flex items-center space-x-4">
              <label>
                <input type="radio" name="gender" value="Male" /> Male
              </label>
              <label>
                <input type="radio" name="gender" value="Female" /> Female
              </label>
              <label>
                <input type="radio" name="gender" value="Other" /> Other
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="degree" className="block font-medium">
              Degree
            </label>
            <select name="degree" className="border p-2 rounded w-full">
              <option value="B.Voc">B.Voc</option>
              <option value="BCA">BCA</option>
              <option value="B.COM">B.COM</option>
              <option value="BBA">BBA</option>
              <option value="BSC">BSC</option>
              <option value="B-TECH">B-TECH</option>
              <option value="DIPLOMA">DIPLOMA</option>
            </select>
          </div>

          <div>
            <label htmlFor="join_date" className="block font-medium">
              Join Date
            </label>
            <input
              type="date"
              name="join_date"
              className="border p-2 rounded w-full"
            />
          </div>
          <button className="bg-gray-500 rounded-md text-white px-3 py-2 shadow-lg cursor-pointer">Create</button>
        </div>
      </div>
    </div>
    )}
    </>


  )
}

export default CreatNewBtn