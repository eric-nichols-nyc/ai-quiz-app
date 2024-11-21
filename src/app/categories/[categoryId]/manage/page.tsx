"use client";
import QuestionList from "@/components/QuestionList";
import { getCardsByCategoryId, getCategoryName } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "@/components/Breadcrumbs"; // Import the Breadcrumbs component

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Question List" } // Current page, no href
];

const ManagePage = ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;

  const handleEdit = (id: string) => {
    console.log(`Edit question with id: ${id}`);
    // Implement your edit logic here
  };

  const handleDelete = (id: string) => {
    console.log(`Delete question with id: ${id}`);
    // Implement your delete logic here
  };

  // get the cards for the category
  const { data: cards, isLoading, isError } = useQuery({
    queryKey: ["cards", categoryId],
    queryFn: () => getCardsByCategoryId(categoryId),
  });

  // get the category name
  const { data: category } = useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => getCategoryName(categoryId),
  });

  console.log(cards);

  return (
    <>
      {isLoading && <div>Loading categories...</div>}

      <div className="p-4 w-full">
      <Breadcrumbs items={breadcrumbItems} /> {/* Add Breadcrumbs here */}

        <h2 className="text-2xl font-bold mb-4">
          {category}
        </h2>
        <QuestionList
          questions={cards || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          categoryId={categoryId}
        />
      </div>

    </>
  );
};

export default ManagePage;
