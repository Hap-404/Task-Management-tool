import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const SignUp = () => {
  const [profilepic,setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [adminInviteToken,setAdminInviteToken] = useState("");

  const [error,setError] = useState(null);


  const handleSignUp = async (e) => {
      e.preventDefault();
  
      if(!fullName){
        setError("Please enter Full Name");
        return;
      }
      
      if(!validateEmail(email)){
        setError("Please enter a valid email address");
        return;
      }
  
      if(!password){
        setError("Please Enter correct password");
      }
  
        setError("")
    };
    

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <p className='text-xl font-semibold text-black'>
          Create An Account
          <h3 className='text-xs text-slate-700 mt-[5px] mb-6'>
            Join us by entering your details below.
          </h3>  
        </p>  

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilepic} setImage={setProfilePic} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> 
               
            </div>

        </form>


      </div>  
    </AuthLayout>
  )
}

export default SignUp