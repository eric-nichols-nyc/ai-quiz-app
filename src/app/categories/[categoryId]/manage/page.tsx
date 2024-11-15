"use client";
import React from "react";
import { sampleCards } from "@/data/sampleData";
import QuestionList from "@/components/QuestionList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  return (
    <>
      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-4">
          Manage Questions in Category {categoryId}
        </h2>
        <Button className="mb-4">Add Question</Button>
        <QuestionList
          questions={sampleCards}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManagePage;
