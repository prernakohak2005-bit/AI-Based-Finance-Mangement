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
import { Switch } from "@/components/ui/switch";
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

      reset();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>

      <DrawerContent>
        <div className="px-5 pb-7">
          <DrawerHeader>
            <DrawerTitle>Create New Account</DrawerTitle>
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Name</label>
              <Input
                placeholder="e.g Main Checking"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Account Type</label>

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
            </div>

            {/* Balance */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Initial Balance</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
              />
              {errors.balance && (
                <p className="text-red-500 text-sm">
                  {errors.balance.message}
                </p>
              )}
            </div>

            {/* ✅ FIXED SWITCH */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">
                  Set as Default
                </label>
                <p className="text-xs text-gray-500">
                  This account will be used by default
                </p>
              </div>

              <Switch
                checked={watch("isDefault")}
                onCheckedChange={(checked) =>
                  setValue("isDefault", checked, {
                    shouldValidate: true,
                  })
                }
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                className="flex-1"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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