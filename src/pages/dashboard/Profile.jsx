import { useSelector,useDispatch } from 'react-redux';
import { DashboardForm } from '../../components/DashboardForm';
import { updateProfile, toggleIsLoading } from '../../features/pageSlice/profilePageSlice.js';
import Loading from '../../components/Loading';
import { Input } from '../../components/formInput';
import { changeProfileState } from '../../features/pageSlice/profilePageSlice.js';
import { useEffect } from 'react';



const Profile = () => {
 
  const { isLoading,location, name, email, lastName } = useSelector((store) => store.profilePageSlice);
  const { user } = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();

  useEffect(()=>{
  for (let name in user  ){
    dispatch(changeProfileState({name, value: user[name] }))
  }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(toggleIsLoading(true));
    const { location, name, email, lastName } = event.target.elements;
    dispatch(updateProfile({ name: name.value, email: email.value, lastName: lastName.value, location: location.value }));
  };
    
  const handleOnchange = (e)=>{
    e.preventDefault()
    const { name, value }  = e.target
    dispatch(changeProfileState({name,value }))
  }
    
 
  return (
    <DashboardForm>
      <h3>Profile</h3>
      <form onSubmit={handleSubmit}>
        
        <Input  type='text' name='name' id='name' value={name} onChange={handleOnchange} />
        
        <Input type='text' name='lastName' id='lastName'value={lastName} onChange={handleOnchange} />
        <Input type='email' name='email' id='email'value={email} onChange={handleOnchange}  />
        
        <Input type='text' name='location' id='location' value={location} onChange={handleOnchange} />
       
        <button type='submit' disabled={isLoading}>
          {isLoading ? (
            <div>
              <Loading />
              <div>Save Changes</div>
            </div>
          ) : (
            <div>Save Changes</div>
          )}
        </button>
      </form>
    </DashboardForm>
  );
};
export default Profile;
