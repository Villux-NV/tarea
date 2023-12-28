import { getXataClient } from "@/xata";

export default async function DetailCard({ userId, projectId }: { userId: string, projectId: string }) {
    const xataClient = getXataClient();

    const details = await xataClient.db.projectDetails.filter({ projectId }).getMany();

    if (!userId) return;

    return (
        <div>
            {
                details.map(det => 
                    <div key={det.id} className="px-6">
                        <div className="border flex">
                            <div>
                                {det.description} 
                            </div>
                            <div className="border flex justify-center items-center">
                                -
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
