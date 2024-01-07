'use client';

import Modal from "@/app/_components/modal";
import { useEffect, useRef, useState } from "react"

export default function ProjectCard({ project, handleAddDetail, handleDeleteCard }: { project: any, handleAddDetail: (formData : FormData) => void, 
        handleDeleteCard: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ref = useRef();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div ref={ref} className="border w-64 h-80 m-6 flex flex-col justify-between relative">
            <h2>{project.project}</h2>

            <div className="flex justify-between">
                <form action={handleDeleteCard}>
                    <input className="hidden" name="id" defaultValue={project.id}></input>
                    <button className="ml-2">Delete</button>
                </form>
                <button onClick={handleOpenModal} className="border w-10 m-1.5">+</button>
            </div>

            {isModalOpen && (
                    <Modal onClose={handleCloseModal} handleAddDetail={handleAddDetail} />
                )
            }
        </div>
    )
}

