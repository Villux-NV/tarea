import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

export default function DetailCard({ id, description, handleDeleteDetail }: { id: string, description: string | null | undefined, handleDeleteDetail: (formData : FormData) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id, data: { type: 'detail' }});

    return (
        <div ref={setNodeRef} {...attributes} style={{ transition, transform: CSS.Translate.toString(transform)}} 
            className={clsx('flex w-full pb-1', isDragging && 'opacity-50 border')} {...listeners}>
            <div className="-indent-4 px-5 flex-grow">
                {description}
            </div>

            <div className="w-6 shrink-0 flex justify-center">
                <form action={handleDeleteDetail}>
                    <input className="hidden" name="detailId" defaultValue={id} />
                    <button className="w-full h-full">
                        -
                    </button>
                </form>
            </div>
        </div>
    )
}
