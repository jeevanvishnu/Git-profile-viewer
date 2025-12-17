import React ,{useCallback, useEffect, useState}from 'react'
import Search from '../components/Search'
import ProfileInfo from '../components/ProfileInfo';
import Spinner from '../components/Spinner';
import axios from 'axios';
import toast from 'react-hot-toast';
import Repos from '../components/Repos';
import SortRepo from '../components/SortRepo';

const HomePage = () => {
const [userProfile , setUserProfile] = useState(null)
const [repos , setRepos] = useState<string[]>([])
const [loading , setLoading] = useState(false)
const [sortType  , setSortType] = useState("Most")


const getUserandProfile = useCallback(async(username:string = "jeevanVishnu")=>{
	setLoading(true)
	try{
		const res = await axios.get('https://api.github.com/users/jeevanvishnu')
		const {userProfile , repos} =  res.data
		console.log("...............",userProfile , repos)
		repos.sort((a , b) => new Data(b.created_at) - new Date(a.created_at))
		setUserProfile(userProfile)
		setRepos(repos)
		return {userProfile , repos}
	}catch(err:any){
		toast.error(err.message || "Internal server error")
	}finally{
		setLoading(false)
	}
},[])


const onSearch = async (e:React.FormEvent<HTMLFormElement> , username:string) =>{
	e.preventDefault()
	setLoading(true)
	setUserProfile(null)
	setRepos([])
	
	const {userProfile , repos} = await getUserandProfile(username)

	setUserProfile(userProfile)
	setRepos([...repos])
	setLoading(false)
	setSortType('resent')
}


	const onSort = (sortType) => {
		if (sortType === "recent") {
			repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); 
		} else if (sortType === "stars") {
			repos.sort((a, b) => b.stargazers_count - a.stargazers_count); 
			repos.sort((a, b) => b.forks_count - a.forks_count); 
		}
		setSortType(sortType);
		setRepos([...repos]);
	};


	useEffect(()=>{
		getUserandProfile()
	},[getUserandProfile])
  return (
   <div className='m-4'>
			<Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepo onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
			</div>
		</div>
  )
}

export default HomePage