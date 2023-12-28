// "use client";

import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';
// import { useRef } from 'react';

export default function CreateProject({ handleCreateProject }: { handleCreateProject: (formData : FormData) => void }) {
    // const refForm = useRef<HTMLFormElement>(null);

    return (
        <div className='bg-slate bg-opacity-100 overflow-y-auto h-24 flex justify-center items-center outline outline-rose outline-1'>
            <form 
                className="w-72 flex justify-center"
                action={(formData) => handleCreateProject(formData)}
                // refForm.current?.reset()
                // ref={refForm}
            >
                <div className='outline-double w-3/5'>
                    <label
                        className="text-rose text-sm font-bold mb-2 hidden"
                        htmlFor="project"
                        aria-label="Add Project"
                        >
                        Project Title
                    </label>
                
                    <input
                        className="shadow appearance-non w-full py-2 px-3 
                        text-black leading-tight"
                        autoFocus
                        name="project"
                        id="project"
                        type="text"
                        placeholder="Tarea Title"
                        />
                </div>
                
                <button className="text-rose w-1/5 outline-double ml-1 bg-black">
                    Add
                </button>
            </form>
        </div>
    )
}
