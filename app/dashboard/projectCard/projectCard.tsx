// 'use client';


export default function ProjectCard({ id, title, userId, handleDeleteProject }: { id: string, title: string | null | undefined, userId: string, handleDeleteProject: (formData : FormData) => void }) {
    // 

    if (!userId) return


    // const handleDeleteProject = async (data: FormData) => {
    //     'use server';
    //     console.log(data)

    //     const projectId = data.get("projectId")
    // }

    return (
        <div key={id} className="border w-60 h-72 m-6 flex flex-col justify-between">
            <div className="m-2">
                <p>{title}</p>
            </div>
            <div className="m-2 flex">
                <button className="px-4">
                {/* onClick={() => viewCard(id)} */}
                    view
                </button>

                <form className="px-4" action={handleDeleteProject}>
                    <input className="hidden" name="id" value={id}></input>
                    <button className="" type="submit">
                        delete
                    </button>
                </form>
            </div>
        </div>  

    )
}