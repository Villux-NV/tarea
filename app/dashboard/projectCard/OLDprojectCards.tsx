'use client';

import Modal from "@/app/_components/modal";
import { useEffect, useRef, useState } from "react"
import DetailCardContainer from "./_detailCard/detailCardContainer";

export default function ProjectCard({ userId, project, details, handleAddDetail, handleDeleteCard, handleDeleteDetail }: { userId: string, project: any, 
        details: any, handleAddDetail: (formData : FormData) => void, handleDeleteCard: (formData : FormData) => void, handleDeleteDetail: (formData : FormData) => void }) {
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

    function addDetail (formData: FormData) {
        handleCloseModal();
        formData.append('id', project.id);
        handleAddDetail(formData);
    }

    let filteredDetails = details.filter(d => d.projectId === project.id)

    if (!userId) return;

    return (
        <div ref={ref} className="border w-64 h-80 m-6 flex flex-col justify-between relative">
            <div className="m-2 flex justify-between">
                <h2>{project.project}</h2>
                <div>{"->"}</div>
            </div>

            <DetailCardContainer details={filteredDetails} handleDeleteDetail={handleDeleteDetail} />

            <div className="flex justify-between">
                <form action={handleDeleteCard}>
                    <input className="hidden" name="id" defaultValue={project.id} />
                    <button className="ml-2">Delete</button>
                </form>

                <button onClick={handleOpenModal} className="border w-10 m-1.5">+</button>
            </div>

            {isModalOpen && (
                    <Modal onClose={handleCloseModal} handleAddDetail={addDetail} projectId={project.id} />
                )
            }
        </div>
    )
}

