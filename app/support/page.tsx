export default function Support() {
    return (
        <div className="flex flex-col w-full bg-black items-center">
            <div className="w-full h-28 "></div>
            <div className="w-full fixed left-0 top-20 bg-black border-b">
                <div className="col-start-2 col-end-3">
                    <h1 className="flex justify-center items-center h-20">
                        Support
                    </h1>
                </div>

                <div className="col-start-1 col-end-4 flex justify-center">
                    <div className="px-8">Recommendation</div>
                    <div className="px-8">Bug/Issues</div>
                </div>
            </div>
        </div>
    )
}