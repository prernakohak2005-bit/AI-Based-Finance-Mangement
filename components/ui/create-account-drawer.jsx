"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/app/lib/schema";
import { createAccount } from "@/actions/dashboard";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createAccount(data);

      toast.success("Account created successfully ✅");

      setOpen(false);
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      
      {/* ✅ IMPORTANT: must pass BUTTON */}
     <DrawerTrigger asChild>
  <button className="border border-dashed rounded-lg px-8 py-5 cursor-pointer hover:shadow-sm transition w-full text-left">
    <span className="text-sm text-gray-600">
      + Add New Account
    </span>
  </button>
</DrawerTrigger>

      <DrawerContent>
        <div className="w-full px-4">

          <DrawerHeader>
            <DrawerTitle>Create New Account</DrawerTitle>
            <DrawerDescription>
              Fill in the details to create your account
            </DrawerDescription>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <Input placeholder="Account Name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Type */}
            <Select
              onValueChange={(val) =>
                setValue("type", val, { shouldValidate: true })
              }
              defaultValue={watch("type")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURRENT">Current</SelectItem>
                <SelectItem value="SAVINGS">Savings</SelectItem>
              </SelectContent>
            </Select>

            {/* Balance */}
            <div>
              <Input
                type="number"
                placeholder="Balance"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-red-500 text-sm">
                  {errors.balance.message}
                </p>
              )}
            </div>

            {/* Default */}
            <div className="flex items-center gap-2">
              <Checkbox
                checked={!!watch("isDefault")}
                onCheckedChange={(val) =>
                  setValue("isDefault", !!val)
                }
              />
              <p className="text-sm">Set as Default</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>

          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;