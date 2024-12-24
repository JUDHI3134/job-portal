import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppcontextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    })
    const [isSearched, setIsSearched] = useState(false)
    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)
    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    //Functions to fetch jobs
    const fetchJobs = async () =>{
        setJobs(jobsData);
    }

    //function to fetch company data

    

    useEffect(()=>{
        fetchJobs();

        const storedCompanyToken = localStorage.getItem('companyToken')

        if(storedCompanyToken){
            setCompanyToken(storedCompanyToken)
        }

    },[])


    const value = {
        searchFilter, setSearchFilter,isSearched, setIsSearched,jobs,setJobs,showRecruiterLogin, setShowRecruiterLogin, companyToken,companyData, setCompanyToken, setCompanyData,
        backendUrl
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}