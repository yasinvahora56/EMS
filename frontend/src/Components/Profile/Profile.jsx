import logo from '../Images/logo.jpg'

const Profile = () => {
    const Data = [
        {
            name:"Yasin",
            designation: "Owner",
            join_date: "01/02/2021",
            email:"iamyasin@gmail.com",
            phone:"9808127323",
        },
    ]
  return (
    <>
        
        <div className='flex flex-col gap-2 max-w-80 items-center justify-center min-h-screen'>
        <h1 className='flex relative top-0 left-0'>Admin Profile</h1>
            {Data.map((admin) => (
                <div className='bg-black'>
                    <div>
                    <img src={logo} alt="" />
                    <h1>{admin.name}</h1>
                    <p>{admin.designation}</p>
                    </div>
                    <div>
                        <h1>Join Date</h1>
                        <p>{admin.join_date}</p>
                    </div>
                    <div>
                        <h1>Email</h1>
                        <p>{admin.email}</p>
                    </div>
                    <div>
                        <h1>Phone</h1>
                        <p>{admin.phone}</p>
                    </div>
                </div>
            ))}
        </div>
         </>
  )
}

export default Profile
