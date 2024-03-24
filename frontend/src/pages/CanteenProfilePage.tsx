import { useCreateMyCanteen, useGetMyCanteen, useUpdateCanteen } from "@/api/MyCanteenApi";
import CanteenProfileForm from "@/forms/canteen-profile-form/CanteenProfileForm";

  const CanteenProfilePage = () => {
    const {createCanteen,isLoading:isCreateLoading}=useCreateMyCanteen();

    const {Canteen}=useGetMyCanteen();

    const {updateCanteen,isLoading:isUpdateLoading}=useUpdateCanteen();
    const isEditing= !!Canteen;

   return <CanteenProfileForm 
   canteen={Canteen}
   onSave={isEditing? updateCanteen:createCanteen} isLoading={isCreateLoading || isUpdateLoading}/>;
   };

   
  export default CanteenProfilePage;