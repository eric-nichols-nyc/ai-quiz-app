"use client";
import QuestionList from "@/components/QuestionList";
import { getCardsByCategoryId, getCategoryName } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "@/components/Breadcrumbs"; // Import the Breadcrumbs component
import { Button } from "@/components/ui/button"; // Add this import
import Link from "next/link"; // Add this import

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Question List" } // Current page, no href
];

const ManagePage = ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = params;

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
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {category}
          </h2>
          <Link href={`/categories/${categoryId}/practice`}>
            <Button variant="default">
              Practice
            </Button>
          </Link>
        </div>

        <QuestionList
          questions={cards || []}
          categoryId={categoryId}
        />
      </div>
    </>
  );
};

export default ManagePage;
