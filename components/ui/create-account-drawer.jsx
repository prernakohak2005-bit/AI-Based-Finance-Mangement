"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
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

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

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

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setOpen(false);
    reset();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      
      {/* Trigger */}
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent className="bg-white text-black">

        {/* FULL WIDTH (dashboard style, left aligned) */}
        <div className="w-full px-6">

          {/* Header */}
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-xl font-semibold">
              Create New Account
            </DrawerTitle>
          </DrawerHeader>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 pb-6"
          >

            {/* Account Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Account Name
              </label>

              <Input
                placeholder="e.g. Main Checking"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Account Type
              </label>

              <Select
                onValueChange={(value) => setValue("type", value)}
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
            </div>

            {/* Initial Balance */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Initial Balance
              </label>

              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
              />

              {errors.balance && (
                <p className="text-sm text-red-500">
                  {errors.balance.message}
                </p>
              )}
            </div>

            {/* Set Default */}
            <div className="flex items-start gap-3">
              <Checkbox
                checked={watch("isDefault")}
                onCheckedChange={(val) =>
                  setValue("isDefault", val)
                }
              />
              <div>
                <p className="text-sm font-medium">
                  Set as Default
                </p>
                <p className="text-xs text-gray-500">
                  This account will be selected by default for transactions
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t pt-4 flex justify-end gap-3">

              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit">
                Create Account
              </Button>

            </div>

          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;