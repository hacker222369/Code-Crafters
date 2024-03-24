import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NameSection from "./NameSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Canteen } from "@/types";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { useEffect } from "react";

const formSchema = z
  .object({
    canteenName: z.string({
      required_error: "Canteen name is required",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type CanteenFormData = z.infer<typeof formSchema>;

type Props = {
  canteen?: Canteen;
  onSave: (canteenFormData: FormData) => void;
  isLoading: boolean;
};

const CanteenProfileForm = ({ onSave, isLoading, canteen }: Props) => {
  const form = useForm<CanteenFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if(!canteen){
      return;
    }

    const deliveryPriceFormatted=parseInt(
      (canteen.deliveryPrice/100).toFixed(2)
    );
      const menuItemsFormatted=canteen.menuItems.map((item)=>({
        ...item,
        price:parseInt((item.price/100).toFixed(2)),
      }))

      const updatedCanteen={
        ...canteen,
        deliveryPrice:deliveryPriceFormatted,
        menuItems:menuItemsFormatted,
      }

      form.reset(updatedCanteen);


  }, [form,canteen]);



  const onSubmit = (formDataJson: CanteenFormData) => {
    const formData = new FormData();

    formData.append("canteenName", formDataJson.canteenName);
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }
    onSave(formData);
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-red-50 p-10 rounded-lg"
      >
        <NameSection/>
        <Separator/>
        <CuisinesSection/>
        <Separator/>
        <MenuSection/>
        <Separator/>
        <ImageSection/>
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default CanteenProfileForm;
