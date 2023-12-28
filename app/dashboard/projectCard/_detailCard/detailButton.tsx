'use client';

// import { useEffect, useState, useRef } from "react";
import useComponentVisible from "@/app/_components/useComponentVisible";

export default function DetailButton({ handleDetail, id }: { handleDetail: (formData : FormData) => void, id: string }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    
    function detailFunc (formData: FormData) {
        setIsComponentVisible(false);
        formData.set('id', id);
        handleDetail(formData)
    }

    return (
        <div className="col-end-5 relative">
            <button className="border w-8 my-1.5" onClick={() => setIsComponentVisible(true)}>
                +
            </button>

            {
                isComponentVisible &&
                <div ref={ref} className="absolute bottom-10 -right-4 bg-slate bg-opacity-80 overflow-y-auto h-24 flex justify-center items-center outline outline-rose outline-1">
                    <form 
                        className="w-72 flex justify-center"
                        action={(formData) => detailFunc(formData)}
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
            }
        </div>

    )
}