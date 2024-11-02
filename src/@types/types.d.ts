export type Task = {
    _id: string;
    title: string;
    status: "In Progress" | "Completed" | "Pending";
    dueDate: string;
};