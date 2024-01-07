import { getXataClient } from "@/xata";

export default async function DetailCard({ userId, projectId, handleDeleteDetail }: { userId: string, projectId: string, 
    handleDeleteDetail: (formData : FormData) => void }) {
    const xataClient = getXataClient();

    const details = await xataClient.db.projectDetails.filter({ projectId }).getMany();

    if (!userId) return;

    return (
        <div>
            {
                details.map(det => 
                    <div key={det.id} className="flex w-full">
                        <div className="-indent-4 px-5 flex-grow">
                            {det.description} 
                        </div>
                        <div className="w-6 shrink-0 flex justify-center">
                            <form action={handleDeleteDetail}>
                                <input className="hidden" name="detailId" defaultValue={det.id}></input>
                                <button type="submit" className="w-full h-full">
                                    -
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
