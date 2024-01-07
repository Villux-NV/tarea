'use client';

import Link from "next/link";
import CreateProject from "../dashboard/_createProject/page";
import useComponentVisible from "./useComponentVisible";

export const DashNav = ({ handleCreateProject }: { handleCreateProject: (formData : FormData) => void }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

    function handleCreateFunc (formData: FormData) {
        setIsComponentVisible(false);
        handleCreateProject(formData);
    }

    return (
        <div className={'className= flex justify-center z-40' }>
            {/* "flex justify-center"  + getClass() */}
            {/* add hover  */}
            <button className="px-8" onClick={() => setIsComponentVisible(true)}>Add Project</button>
            <button className="px-8" onClick={() => quickTask()}>Quick Task</button>
            <div className="px-8">Urgent</div>

            {
                isComponentVisible &&
                <div ref={ref} className="fixed top-48">
                    <CreateProject handleCreateProject={handleCreateFunc}/>
                </div>
            }
        </div>

    )
}