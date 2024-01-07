export default function Modal({ onClose, handleAddDetail }: { onClose: any, handleAddDetail: (formData : FormData) => void }) {
    const actionDetail = (formData: FormData) => {
        onClose();
        handleAddDetail(formData);
    }

    return (
        <div className="border absolute bottom-0 -right-5 bg-slate bg-opacity-100 overflow-y-auto h-24 flex justify-center items-center outline outline-rose outline-1">
            <form 
                className="w-72 flex justify-center"
                action={(formData) => actionDetail(formData)}
            >
                <div className='outline-double w-3/5'>
                    <label className="hidden" htmlFor="project" aria-label="Add Project" />
                    
                    <input
                    className="shadow appearance-non w-full py-2 px-3 
                    text-black leading-tight"
                    autoFocus
                    name="detail"
                    id="detail"
                    type="text"
                    placeholder="Add Detail"
                    />
                </div>
                
                <button className="text-rose w-1/5 outline-double ml-1 bg-black">
                    Add
                </button>
            </form>
        </div>
    )
};
