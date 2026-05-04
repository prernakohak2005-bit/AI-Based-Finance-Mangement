"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription, // ✅ added
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
import { toast } from "sonner"; // ✅ added

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

      toast.success("Account created successfully ✅"); // ✅ added

      setOpen(false);
      reset();
    } catch (err) {
      console.error("CREATE ACCOUNT ERROR:", err);
      toast.error(err.message || "Something went wrong ❌"); // ✅ added
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      
      {/* ✅ SAFE TRIGGER */}
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent className="bg-white text-black">
        <div className="w-full px-6">

          {/* Header */}
          <DrawerHeader className="px-0">
            <DrawerTitle className="text-xl font-semibold">
              Create New Account
            </DrawerTitle>

            {/* ✅ Fix warning */}
            <DrawerDescription>
              Fill in the details to create your account
            </DrawerDescription>
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
                onValueChange={(value) =>
                  setValue("type", value, { shouldValidate: true })
                }
                defaultValue={watch("type")}
              >
                <SelectTrigger className="bg-white border">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent className="bg-white border shadow-md z-50">
                  <SelectItem value="CURRENT">Current</SelectItem>
                  <SelectItem value="SAVINGS">Savings</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm text-red-500">
                  {errors.type.message}
                </p>
              )}
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

            {/* Default Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                checked={!!watch("isDefault")}
                onCheckedChange={(val) =>
                  setValue("isDefault", !!val, {
                    shouldValidate: true,
                  })
                }
              />

              <div>
                <p className="text-sm font-medium">
                  Set as Default
                </p>
                <p className="text-xs text-gray-500">
                  This account will be selected by default
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t pt-4 flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
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