// import {
//     FormControl, FormDescription,
//     FormField,
//     FormItem,
//     FormLabel, FormMessage
// } from "@/components/ui/form";
// import {Textarea} from "@/components/ui/textarea";
// import {Control} from "react-hook-form";
// interface PromptFieldProps {
//     control: Control<any>;
//     name: string
// }
// export default function PromptField({control, name}: PromptFieldProps) {
// return (
//     <FormField
//           control={control}
//           name={name}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Bio</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell us a little bit about yourself"
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormDescription>
//                 You can <span>@mention</span> other users and organizations.
//               </FormDescription>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
// );
// }