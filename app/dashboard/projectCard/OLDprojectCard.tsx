import DetailCard from "./_detailCard/detailCard";
import DetailButton from "./_detailCard/detailButton";

export default function OldProjectCard({ id, title, userId, handleDeleteProject, handleDetail, viewCard, handleDeleteDetail }: { id: string, title: string | null | undefined, 
    userId: string, handleDeleteProject: (formData : FormData) => void, handleDetail: (formData : FormData) => void, 
    viewCard: (formData : FormData) => void, handleDeleteDetail: (formData : FormData) => void }) {

    if (!userId) return

    return ( 
        <div key={id} className="border w-64 h-80 m-6 flex flex-col justify-between">
            <div className="m-2 flex justify-between">
                <p className="flex-grow">{title}</p>
                <div className="w-6 shrink-0">{"->"}</div>
            </div>
        
            <div className="h-3/4 border mx-2 overflow-auto no-scrollbar">
                <DetailCard userId={userId} projectId={id} handleDeleteDetail={handleDeleteDetail} />
            </div>
        
            <div className="grid grid-cols-4">
                <form className="ml-2 flex items-end" action={viewCard}>
                    <input className="hidden" name="view" defaultValue={id}></input>
                    <button className="" type="submit">
                        view
                    </button>
                </form>
            
                <form className="ml-2 flex items-end" action={handleDeleteProject}>
                    <input className="hidden" name="id" defaultValue={id}></input>
                    <button className="" type="submit">
                        delete
                    </button>
                </form>
            
                <DetailButton handleDetail={handleDetail} id={id} />
            </div>
        </div>  
    )
}