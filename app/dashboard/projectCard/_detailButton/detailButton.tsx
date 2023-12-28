'use client';

import { useEffect, useState, useRef } from "react";


function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    
    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsComponentVisible(false);
        }
    }
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible }
}


export default function DetailButton({ handleDetail, id }: { handleDetail: (formData : FormData) => void, id: string }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    
    function detailFun (formData: FormData) {
        setIsComponentVisible(false);
        formData.set('id', id);
        handleDetail(formData)
    }

    return (
        <div className="col-end-5 ">
            <button className="border w-8 my-1.5" onClick={() => setIsComponentVisible(true)}>
                +
            </button>

            {
                isComponentVisible &&
                <div ref={ref} className="border fixed bg-slate bg-opacity-80 overflow-y-auto h-24 flex justify-center items-center outline outline-rose outline-1">
                    <form 
                        className="w-72 flex justify-center"
                        action={(formData) => detailFun(formData)}
                        ref={ref}
                    >
                        <div className='outline-double w-3/5'>
                            <label
                                className="text-rose text-sm font-bold mb-2 hidden"
                                htmlFor="detail"
                                aria-label="Add Detail"
                            >
                            </label>
                    
                            <input
                                className="shadow appearance-non w-full py-2 px-3 
                                    text-black leading-tight" 
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
            }
        </div>

    )
}