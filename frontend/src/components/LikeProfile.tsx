import React from 'react'
import { FaHeart } from 'react-icons/fa6'
import { useAuthContext } from '../context/AuthContex'
import axios from 'axios'
import toast from 'react-hot-toast'
const LikeProfile = ({userProfile}) => {
  
    const authcontext = useAuthContext()
    
    const isOwnProfile = authcontext?.userProfile === userProfile.login
    console.log(isOwnProfile , "isownprofile");
    console.log(userProfile,"userprofile");
    console.log(userProfile.login,"userprofile-login");
    
    
    

    const handleLikeProfile = async () =>{
      try{
        const res = await axios.post(`/api/v1/user/likes/${userProfile.login}`)
        
        const data = await res.data

        if(data.error){
          toast.error(data.error)
        }
        toast.success(data.message)
      }catch(err){
        toast.error(err.message)
      }

      if(!authcontext || isOwnProfile) return null

    }

  
  return (
    <button
			className='p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2'
			onClick={handleLikeProfile}
		>
			<FaHeart size={16} /> Like Profile
		</button>
  )
}

export default LikeProfile