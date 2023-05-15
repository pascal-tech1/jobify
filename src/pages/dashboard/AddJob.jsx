import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {DashboardForm } from '../../components/DashboardForm';
import  { addjob, modifyAddJobSlice, clearJobInputs, editjob} from '../../features/addJobSlice/addJobPageSlice';
import Loading from '../../components/Loading';
import { useEffect } from 'react';
import { SelectOpt,Input } from '../../components/formInput';




const AddJob = () => {
  
  const { isLoading,position,jobType,jobLocation,status,company  } = useSelector((store) => store.addJobPageSlice);
  const { allJobs, isEditing, jobId } = useSelector((store) => store.allJobSlice);
  const { user } = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(isEditing){
      allJobs.forEach(element => {
        if(element._id === jobId){
          const {company, jobType,jobLocation,status,position}= element
         
       
          dispatch(modifyAddJobSlice({ name:'company', value:company }));
          dispatch(modifyAddJobSlice({ name:'jobType', value:jobType }));
          dispatch(modifyAddJobSlice({ name:'status', value:status }));
          dispatch(modifyAddJobSlice({ name:'position', value:position }));
          dispatch(modifyAddJobSlice({ name:'jobLocation', value:jobLocation }));
        }
      });
     return
    }
    dispatch(modifyAddJobSlice({ name:'jobLocation', value:user.location }));
  },[ ])

  const handleOnchange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(modifyAddJobSlice({ name, value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const { company, jobLocation, jobType, position, status } = event.target.elements;
    if(isEditing){
     
      dispatch(editjob({jobId : jobId, job: {
        position: position.value,
        company: company.value, jobLocation: jobLocation.value, jobType: jobType.value, status: status.value
       }}))
       return
    }
   
    dispatch(addjob({ company: company.value, jobLocation: jobLocation.value, jobType: jobType.value, position: position.value, status: status.value }));
  };

  const clear  = ()=>{
   dispatch(clearJobInputs());
   dispatch(modifyAddJobSlice({ name:'jobLocation', value:user.location }));
  } 


  return (
    <DashboardForm>
      <h3>Add Job</h3>
      <form onSubmit={handleSubmit}>
        
        <Input name='position' id='position' value={position} onChange={handleOnchange} />
        <Input name='company' id='company' value={company} onChange={handleOnchange} />
      
        <Input  name='jobLocation' id='jobLocation' value={jobLocation} onChange={handleOnchange}   />
     
        <SelectOpt  name='status' id='status' value={status} onChange={handleOnchange} optionsValue = { ['pending','interview', 'declined']}   />
  
        <SelectOpt name='jobType' id='jobType' value={jobType} onChange={handleOnchange} optionsValue = { ['full-time','remote','part-time', 'internship']}   />
        <ButtonContainer>
          <button type='submit' disabled={isLoading}>
            {isLoading? (
              <div>
                <Loading />
                <div>Save Changes</div>
              </div>
            ) : (
              <div>Save Changes</div>
            )}
          </button>
          <button type='reset' className='clear' onClick={clear}>
            clear
          </button>
        </ButtonContainer>
      </form>
    </DashboardForm>
  );
};
export default AddJob;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 0.5rem 1.5rem;
  }
  .clear {
    background-color: var(--grey-500);
    :hover {
      background-color: var(--grey-400);
    }
  }
`;
