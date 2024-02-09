'use client';

import DetailCard from "./detailCard";

export default function DetailCardContainer ({ details, handleDeleteDetail }: { details: any, handleDeleteDetail: (formData : FormData) => void }) {
    
    return (
        <div className="h-3/4 border mx-2 overflow-auto no-scrollbar">
            {details &&
                details.map(detail => (
                    <DetailCard key={detail.id} detail={detail} handleDeleteDetail={handleDeleteDetail} />
                ))
            }
        </div>
    )
}