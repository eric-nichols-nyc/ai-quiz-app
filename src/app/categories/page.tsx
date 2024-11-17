import React from "react";
import CategoryList from "@/components/CategoryList";
import { auth } from "@clerk/nextjs/server";
import { getCategories } from "@/actions/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const CategoriesPage = async () => {
  // check if user is authenticated
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="w-full">
        <h1>Your Categories</h1>
        {<CategoryList />}
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesPage;
