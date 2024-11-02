export type Task = {
    id: string;
    title: string;
    status: "In Progress" | "Completed" | "Pending";
    dueDate: string;
};