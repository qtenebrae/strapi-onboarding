import TodoItemsList from '@/components/todoItemsList/todoItemsList';

interface TodosPageProps {
    params: {
        id: number;
    };
}

export default async function TodosPage({ params }: TodosPageProps) {
    const { id } = await params;

    return <TodoItemsList id={id} />;
}
