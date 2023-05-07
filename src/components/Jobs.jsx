import React from 'react'
import Loading from '../components/Loading'
import { useSelector,useDispatch } from 'react-redux';
import { FaLocationArrow,FaBriefcase,FaRegCalendarCheck } from "react-icons/fa";
import styled from 'styled-components';
import moment from 'moment';
import { deleteJob, modifyAllJobSlice } from '../features/allJobSlice/allJobSlice';
import { useState } from 'react';




const Jobs = () => {
  const { isLoading,allJobs,isDeleting,allJobsError } = useSelector((store) => store.allJobSlice);
  const dispatch = useDispatch()
const [deletingId, setDeletingId] = useState(1)


const handleEditing = (e)=>{
  e.preventDefault()
}
const handleDelete = (_id)=>{
dispatch(deleteJob(_id))
dispatch(modifyAllJobSlice({name: 'isDeleting', value: true}))
}




  if(isLoading && !isDeleting){
    return <Loading/>   
   }
   
   if(allJobsError){
   return <h1> ERROR: {allJobsError}</h1>
   }
   if( allJobs.length === 0 ){
    return <h1>No jobs Avalaible</h1>   
   }
  
  
    return (
    <Wrapper>
      {allJobs.map((job) => {
        const { _id, company, position, createdAt, status, jobType, jobLocation } = job;
        const imgLogo = company.charAt(0);
        const formattedDate = moment(createdAt).format('MMM Do, YYYY');

        return (
          <div key={_id} className='job'>
            <div className='job-header'>
              <div className='job-logo'>{imgLogo}</div>
              <div className='job-info'>
                <h5>{position}</h5>
                <p>{company}</p>
              </div>
            </div>
            <div className='job-details'>
              <div className='job-details-icon'>
                <FaLocationArrow /> <h5>{jobLocation}</h5>
              </div>
              <div className='job-details-icon'>
                <FaRegCalendarCheck /> <h5>{formattedDate}</h5>
              </div>
              <div className='job-details-icon'>
                <FaBriefcase /> <h5>{jobType}</h5>
              </div>
              <div className={`status ${status}`}>{status}</div>
              <div>
                <Button className='edit-btn' onClick={handleEditing}>
                  Edit
                </Button>
                <Button
                  className='delete-btn'
                  onClick={(e) => {
                    e.preventDefault();
                    setDeletingId(_id)
                    handleDelete(_id);
                  }}
                >
                  {deletingId === _id && isDeleting ? (
                    <div>
                      <Loading /> Deleting
                    </div>
                  ) : (
                    <div>Delete</div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
}

export default Jobs
const Wrapper = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 4rem;
margin: 8rem 0;

.job{
  background-color:#fff;
  box-shadow: var(--shadow-2);
 
}
.job-info{
  h5{
    font-family: var(--headingFont);
    font-weight: 400;
    letter-spacing: var(--letterSpacing);
    line-height: 1.3;
    margin: 0 0 1.38rem;
    text-transform: capitalize;
  font-size: 1.8rem;
   
  }
  p{
    margin: 0px;
    text-transform: capitalize;
    color: var(--grey-400);
    letter-spacing: var(--letterSpacing);
  font-size: 1.5rem;

  }
}
.job-header{
  display: flex;
  gap: 4rem;
  align-items: center;
 margin-bottom: 2rem;
 border-bottom: 1px solid var(--grey-100);
padding: 2rem;
}
.job-logo{
  background-color: var(--primary-500);
  border-radius: 5px;
 width: 5rem;
 height: 5rem;
 display: flex;
 justify-content: center;
 align-items: center;
 font-size: 2rem;
 color: var(--white);
 font-weight: 700;
text-transform: capitalize;
}
.job-details{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  padding: 2rem;
  gap: 1rem;

}
.job-details-icon{
  display: flex;
  gap: 1rem;
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
  color: var(--textColor);
  font-family: var(--bodyFont);
    font-weight: 400;
  line-height: 1.75;
    font-size: 1.5rem;
  svg{
    color: var(--grey-400);
  }
 
}
.status{
  border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing); 
    display: grid;
    place-content: center;
    width: 100px;
    height: 30px;
    font-size: 1.2rem;
    font-weight: 700;
}
.declined {
    color: rgb(214, 106, 106);
    background: rgb(255, 238, 238);
}
.pending {
    background: rgb(252, 239, 199);
    color: rgb(233, 185, 73);
}
.interview {
    background: rgb(224, 232, 249);
    color: rgb(100, 122, 203);
}
.delete-btn{
      color: var(--red-dark);
    background: var(--red-light);
    }
`
const Button = styled.button`
  all: unset;
  color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
    width: max-content;
    height: 3rem;
    font-size: 1.5rem;
    padding: 0px 1rem;
    border-radius: 5px;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    :hover{
      box-shadow: var(--shadow-3);
    }
 
    :active{
      box-shadow: var(--shadow-1);
    }
`