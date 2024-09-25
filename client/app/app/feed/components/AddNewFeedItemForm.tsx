import {FeedItemAdditionOptionType} from "@/config/FeedItemAdditionConfig";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import extractVideoID from "@/utils/extractVideoID";
import {
    feedItemAdditionSchema
} from "@/app/app/feed/explore/FeedItemAdditionSchema";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {AxiosInstance} from "@/utils/AxiosInstance";
import {toast} from "sonner";

interface AddNewFeedItemFormProps {
    onAdd: () => void,
    itemType: FeedItemAdditionOptionType
}

export default function AddNewFeedItemForm({
                                               itemType,
                                               onAdd
                                           }: AddNewFeedItemFormProps) {
    const form = useForm<z.infer<typeof feedItemAdditionSchema>>({
        resolver: zodResolver(feedItemAdditionSchema),
        defaultValues: {
            articleUrl: "",
            youtubeUrl: "",
        }
    })

    interface FeedItemAdditionData {
        url: string,
        itemType: "YOUTUBE" | "ARTICLE"
    }

    const handleAddingNewFeedItem = async (data: FeedItemAdditionData
    ): Promise<string> => {
        const response = await AxiosInstance.post("/feed/add", data);
        return response.data;
    }

    const {mutateAsync: addNewFeedItem, isPending} = useMutation({
        mutationFn: (data: FeedItemAdditionData) => handleAddingNewFeedItem(data),
        onMutate: () => {
            toast.loading("New feed item is being added");
        },
        onSettled: () => {
            toast.dismiss();
        },
        onSuccess: (data) => {
            console.log(data);
            onAdd();
            toast.success("New feed item added successfully");
        }
    })

    form.setValue("itemType", itemType.toUpperCase() as "YOUTUBE" | "ARTICLE");
    const onSubmit = async (data: z.infer<typeof feedItemAdditionSchema>) => {
        await addNewFeedItem({
            itemType: data.itemType,
            url: data.itemType === "YOUTUBE" ? data.youtubeUrl : data.articleUrl
        });
    }
    const renderSpecificFields = () => {
        switch (itemType) {
            case "youtube":
                return (
                    <FormField control={form.control}
                               name={"youtubeUrl"}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Youtube URL
                                       </FormLabel>
                                       <Input
                                           placeholder="Enter youtube URL"
                                           {...field}/>
                                       <FormDescription>Make
                                           sure the video
                                           is
                                           public.
                                       </FormDescription>
                                       {
                                           field.value && extractVideoID(field.value) &&
                                           <div>
                                               <iframe
                                                   src={"https://www.youtube-nocookie.com/embed/" + extractVideoID(field.value)}
                                                   className={"w-full h-64" +
                                                       " rounded-lg"}
                                                   allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                   allowFullScreen
                                                   title={"Youtube video"}/>
                                           </div>
                                       }

                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                );
            case "article":
                return (
                    <FormField control={form.control}
                               name={"articleUrl"}
                               render={({field}) => (
                                   <FormItem>
                                       <FormLabel>Article
                                           URL</FormLabel>
                                       <Input
                                           placeholder="Enter article URL"
                                           {...field}/>
                                       <FormDescription>The
                                           URL should be
                                           public
                                           and
                                           parsable.</FormDescription>
                                       <FormMessage/>
                                   </FormItem>
                               )}/>
                );
            default:
                return null;
        }
    }


    return (<Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={"flex w-full relative " +
                    " mt-8" +
                    " flex-col gap-6"}>
                {renderSpecificFields()}
                <Button type={"submit"}>Add</Button>
            </form>
        </Form>
    );
}