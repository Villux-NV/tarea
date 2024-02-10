import Modal from "@/app/_components/modal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function ProjectCard({ id, title, children, handleDeleteCard, handleAddDetail }: { id: string, title: string | null | undefined, children: React.ReactNode, 
        handleDeleteCard: (formData : FormData) => void,  handleAddDetail: (formData : FormData) => void
    }) {
    const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({ id: id, data: { type: 'project', }});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (containerRef.current && !containerRef.current.contains(target)) {
                handleCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function addDetail (formData: FormData) {
        handleCloseModal();
        formData.append('id', id);
        handleAddDetail(formData);
    }

    return (
        <div ref={(el: HTMLDivElement) => {setNodeRef(el); containerRef.current = el as HTMLDivElement;}} {...attributes} style={{ transition, transform: CSS.Translate.toString(transform)}}
            className={clsx('border w-64 h-80 m-6 flex flex-col justify-between relative', isDragging && 'opacity-50')}>
            <div className="m-2 flex justify-between">
                <h2>{title}</h2>
                <div {...listeners}>{"///"}</div>
            </div>

            <div className="h-3/4 border mx-2 overflow-auto no-scrollbar">
                {children}
            </div>

            <div className="flex justify-between">
                <form action={handleDeleteCard}>
                    <input className="hidden" name="id" defaultValue={id} />
                    <button className="ml-2">Delete</button>
                </form>

                <button onClick={handleOpenModal} className="border w-10 m-1.5">+</button>
            </div>

            {isModalOpen && (
                    <Modal onClose={handleCloseModal} handleAddDetail={addDetail} projectId={id} />
                )
            }
        </div>
    )
}