import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { DashboardForm } from '../../components/DashboardForm';
import  {modifyAllJobSlice, clearJobInputs, getAllJobs } from '../../features/allJobSlice/allJobSlice'
import { SelectOpt,Input } from '../../components/formInput';
import { useEffect } from 'react';
import Jobs from '../../components/Jobs';


const AllJob = () => {
  
  const state= useSelector((store) => store.allJobSlice);
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(getAllJobs())
  },[])

  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(value)
    dispatch(modifyAllJobSlice({ name, value }));
  };
  const handleSubmit = (event) => {
     event.preventDefault();
     //   dispatch(modifyAddJobSlice({ name: 'isLoading', value: !isLoading }));

     //   const { company, jobLocation, jobType, position, status } = event.target.elements;

     //   dispatch(addjob({ company: company.value, jobLocation: jobLocation.value, jobType: jobType.value, position: position.value, status: status.value }));
  };
  const clear  = ()=>{
   dispatch(clearJobInputs());
  }
 
  return (
    <div>
    <DashboardForm>
      <h3>Search</h3>
      <form onSubmit={handleSubmit}>
       <Input name='search' id='search' value={state.search} onChange={handleOnchange} />
       <SelectOpt  name='status' id='status' value={state.status} onChange={handleOnchange} optionsValue = { ['all','pending','interview', 'declined']}   />
        <SelectOpt  name='jobType' id='jobType' value={state.jobType} onChange={handleOnchange} optionsValue = { [ 'all','full-time','remote','part-time', 'internship']}   />
        <SelectOpt  name='sort' id='sort' value={state.sort} onChange={handleOnchange} optionsValue = { ['latest','oldest','a-z', 'z-a']}   />
        <Button type='reset' className='clear'>
            clear filter
        </Button>
      </form>
    </DashboardForm>
     <Jobs/>
     </div>
  );
};
export default AllJob;



const Button = styled.button`
  
  background-color: #be5050 !important;

  :hover{
    background-color: #d67a7a !important;
  }
`