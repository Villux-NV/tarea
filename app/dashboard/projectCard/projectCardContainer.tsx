'use client';

import { DndContext, DragEndEvent, DragMoveEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, closestCenter, closestCorners, useDraggable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { MasterProjects, ProjectDetailsRecord, getXataClient } from "@/xata";
import DetailCard from "./_detailCard/detailCard";
import ProjectCard from "./projectCard";
import { useState } from "react";

export default function ProjectCardContainer({ userId, projects, details, handleAddDetail, handleDeleteCard, handleDeleteDetail }: { userId: string, projects: any, 
        details: any, handleAddDetail: (formData : FormData) => void, handleDeleteCard: (formData : FormData) => void, handleDeleteDetail: (formData : FormData) => void 
    }) {
    const [projectCards, setProjectCards] = useState(projects);
    const [detailCards, setDetailCards] = useState(details);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [activeType, setActiveType] = useState(null);

    const findValueOfItems = (id: UniqueIdentifier | undefined, type: string) => {
        if (type === 'project') {
            return projectCards.find((project) => project.id === id);
        }
        if (type === 'detail') {
            return detailCards.find((detail) => detail.id === id);
        }
    };

    // DND Handlers
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragStart = (e: DragStartEvent) => {
        const { active } = e;
        const { id, data } = active;
        setActiveId(id);
        setActiveType(data.current?.type);
    };

    const handleDragOver = async (e: DragOverEvent) => {
        const { active, over } = e;

        // handle item sorting
        if (active?.data.current?.type === 'detail' && over?.data.current?.type === 'detail' && active && over && active.id !== over.id) {
            // find active/over details
            const activeDetail = findValueOfItems(active.id, 'detail');
            const overDetail = findValueOfItems(over?.id, 'detail');
            
            if (!activeDetail || !overDetail) return;
            
            // find project id
            const activeProjectId = activeDetail.projectId;
            const overProjectId = overDetail.projectId;

            // find project index
            const activeProjectIndex = projectCards.findIndex((project) => project.id === activeProjectId)
            const overProjectIndex = projectCards.findIndex((project) => project.id === overProjectId)

            // find detail index
            const activeDetailIndex = detailCards.findIndex((detail) => detail.id === activeDetail.id)
            const overDetailIndex = detailCards.findIndex((detail) => detail.id === overDetail.id)

            // find active/over detail order
            const activeDetailOrder = activeDetail.detailOrder;
            const overDetailOrder = overDetail.detailOrder;
            
            // handle updates if the order is updated within same project
            if (activeProjectId === overProjectId) {
                // let newDetails = arrayMove(detailCards, activeDetailIndex, overDetailIndex);
                setDetailCards(prevDetails => arrayMove(prevDetails, activeDetailIndex, overDetailIndex));
            } else {
                setDetailCards(prevDetails => {
                    let newDetails = [...prevDetails];
                    const [movedDetail] = newDetails.splice(detailCards.findIndex((detail) => detail.id === activeDetail.id), 1);
                    movedDetail.projectId = overProjectId;
                    movedDetail.detailOrder = newDetails.filter(detail => detail.projectId === overProjectId).length;
                    newDetails.push(movedDetail);
                    return newDetails;
                });
            }
        }        

        // or if dropped in a new project
        if (active?.data.current?.type === 'detail' && over?.data.current?.type === 'project' && active && over && active.id !== over.id) {
            const activeDetail = findValueOfItems(active.id, 'detail');
            const overProject = findValueOfItems(over?.id, 'project');

            if (!activeDetail || !overProject) return;

            let newDetails = [...detailCards];
            const [movedDetail] = newDetails.splice(detailCards.findIndex((detail) => detail.id === activeDetail.id), 1);
            movedDetail.projectId = overProject.id;
            movedDetail.detailOrder = newDetails.filter(detail => detail.projectId === overProject.id).length;

            newDetails.push(movedDetail);
            setDetailCards(newDetails);
        }
    };


    const handleDragEnd = async (e: DragEndEvent) => {
        const { active, over } = e;
        const xataClient = getXataClient();

        // project sorting
        if (active?.data.current?.type === 'project' && over?.data.current?.type === 'project' && active && over && active.id !== over.id) {
            // get project
            const activeProject = findValueOfItems(active.id, 'project');
            const overProject = findValueOfItems(over?.id, 'project');

            if (!activeProject || !overProject) return;
            
            // get project index
            const activeProjectIndex = projectCards.findIndex((project) => project.id === activeProject.id);
            const overProjectIndex = projectCards.findIndex((project) => project.id === overProject.id);

            let newProjects = arrayMove(projectCards, activeProjectIndex, overProjectIndex);

            newProjects.forEach((project, index) => {
                project.cardOrder = index;
            })

            setProjectCards(newProjects);

            try {
                for (let project of newProjects) {
                    await xataClient.db.masterProjects.update(project.id, { cardOrder: project.cardOrder });
                }
            } catch (e) {
                console.error(e)
            }
        }

        // detail sorting
        if (active.data.current?.type === 'detail' && active && over) {
            // find active/over details
            const activeDetail = findValueOfItems(active.id, 'detail');
            const overDetail = findValueOfItems(over?.id, 'detail');

            if (!activeDetail || !overDetail) return;
            
            let newDetails = [...detailCards];
            const activeDetailIndex = detailCards.findIndex((detail) => detail.id === activeDetail.id);            
            const overDetailIndex = overDetail ? detailCards.findIndex((detail) => detail.id === overDetail.id) : -1;            

            // handle updates if the order is updated within same project
            if (activeDetail.projectId === overDetail?.projectId) {
                newDetails = arrayMove(newDetails, activeDetailIndex, overDetailIndex);
                const projectDetails = newDetails.filter(detail => detail.projectId === activeDetail.projectId);
                projectDetails.forEach((detail, index) => {
                        detail.detailOrder = index;
                });
            } else {
                const [movedDetail] = newDetails.splice(activeDetailIndex, 1);
                movedDetail.projectId = overDetail.projectId;
                movedDetail.detailOrder = newDetails.filter(detail => detail.projectId === overDetail.projectId).length;
                newDetails.push(movedDetail);

                const originalProjectDetails = newDetails.filter(detail => detail.projectId === activeDetail.projectId);
                const newProjectDetails = newDetails.filter(detail => detail.projectId === overDetail.projectId);
                originalProjectDetails.forEach((detail, index) => detail.detailOrder = index);
                newProjectDetails.forEach((detail, index) => detail.detailOrder = index);
            }

            setDetailCards(newDetails);

            try {
                for (let detail of newDetails) {
                    await xataClient.db.projectDetails.update(detail.id, { detailOrder: detail.detailOrder, projectId: detail.projectId });
                }
            } catch (e) {
                console.error(e);
            }
        }

        setActiveId(null);
    }

    const DragOverlayComponent = () => {
        const { setNodeRef } = useDraggable({ id: activeId });
        const item = findValueOfItems(activeId, activeType);

        return (
            <div ref={setNodeRef} style = {{ pointerEvents: 'none' }}>
                {activeType === 'detail' ? (
                    <DetailCard key={item.id} id={item.id} description={item.description} />

                ) : (
                    <ProjectCard key={item.id} id={item.id} title={item.title} />
                )}
            </div>
        )
    }

    if (!userId) return;

    return (
        <div className="h-fill flex flex-wrap">
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
                <SortableContext items={projectCards} strategy={rectSortingStrategy}>
                    {projectCards.map((project: MasterProjects) => (
                        <ProjectCard key={project.id} id={project.id} title={project.project} handleDeleteCard={handleDeleteCard} handleAddDetail={handleAddDetail}>
                            <SortableContext items={detailCards.filter((detail) => detail.projectId === project.id)} strategy={verticalListSortingStrategy}>
                                {detailCards.filter((detail: ProjectDetailsRecord) => detail.projectId === project.id)
                                    .map((detail: ProjectDetailsRecord) => (
                                        <DetailCard key={detail.id} id={detail.id} description={detail.description} handleDeleteDetail={handleDeleteDetail} />
                                ))}
                            </SortableContext>
                        </ProjectCard>
                    ))}
                </SortableContext>

                <DragOverlay>
                    {activeId ? <DragOverlayComponent id={activeId} /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
};
