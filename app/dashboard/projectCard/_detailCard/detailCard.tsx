import { getXataClient } from "@/xata";


export default async function DetailCard({ userId, projectId }: { userId: string, projectId: string }) {
    const xataClient = getXataClient();

    const details = await xataClient.db.projectDetails.filter({ projectId }).getMany();

    if (!userId) return;

    return (
        <div>
            {
                details.map(det => 
                    <div key={det.id} className="pl-3">
                        {det.description}
                    </div>
                )
            }
        </div>
    )
}
