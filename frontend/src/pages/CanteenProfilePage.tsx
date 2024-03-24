import { useCreateMyCanteen, useGetMyCanteen } from "@/api/MyCanteenApi";
import CanteenProfileForm from "@/forms/canteen-profile-form/CanteenProfileForm";

  const CanteenProfilePage = () => {
    const {createCanteen,isLoading}=useCreateMyCanteen();

    const {Canteen}=useGetMyCanteen();
   return <CanteenProfileForm 
   canteen={Canteen}
   onSave={createCanteen} isLoading={isLoading}/>;
  };
  
   
  export default CanteenProfilePage;