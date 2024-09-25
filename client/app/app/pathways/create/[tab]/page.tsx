import { PathwayCreationType } from "@/types/PathwayTypes/PathwayCreationType";
import { PathwayInputForm } from "@/app/app/pathways/components/PathwayInputForm";
import PathwayChatComp from "@/app/app/pathways/components/PathwayChatComp";


export default function CreatePathway({ params }: {
    params: { tab: PathwayCreationType }
}) {
    return (
        <div className='flex flex-row w-full h-full justify-between items-start'>
            <PathwayInputForm 
                tab={params.tab}
            />
            <PathwayChatComp />
        </div>
    );
}
