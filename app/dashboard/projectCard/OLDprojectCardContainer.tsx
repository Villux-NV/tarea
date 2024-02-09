'use client';

import ProjectCard from "./OLDERprojectCard";
import { useState } from "react";
import { Reorder } from "framer-motion";

export default function OldProjectCardContainer({ projects, handleDeleteProject, handleDetail, viewCard, handleDeleteDetail }: { projects: any, 
    handleDeleteProject: (formData : FormData) => void, handleDetail: (formData : FormData) => void, 
    viewCard: (formData : FormData) => void, handleDeleteDetail: (formData : FormData) => void }) {
    // const [cards, setCards] = useState(projects);

    return (
        <div className="h-fill flex flex-wrap">
            { projects &&
                projects.map((p: any) => (
                    <div key={p.id + p.title}>
                            <ProjectCard key={p.id} id={p.id} title={p.project} userId={p.userId} 
                            handleDeleteProject={handleDeleteProject} handleDetail={handleDetail} viewCard={viewCard} handleDeleteDetail={handleDeleteDetail} />
                        </div>
                    )
                )
            } 
        </div>    
        // <Reorder.Group values={cards} onReorder={setCards} className="h-fill flex flex-wrap">  
            // {   cards &&
            //     cards.map((card: any) => (
            //         <div key={card.id + card.title}>
            //             <ProjectCard key={card.id} id={card.id} title={card.project} userId={card.userId} 
            //             handleDeleteProject={handleDeleteProject} handleDetail={handleDetail} viewCard={viewCard} handleDeleteDetail={handleDeleteDetail} />
            //         </div>
            //     ))
            // }
        // </Reorder.Group>
    )
};