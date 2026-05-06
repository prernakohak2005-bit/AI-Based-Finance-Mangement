"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowUpRight } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateDefaultAccount } from "@/actions/accounts";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  if (!account) return null;

  const { name, type, balance, isDefault, id } = account;

  // 🔥 DEBUG (VERY IMPORTANT)
  console.log("AccountCard ID:", id);

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e) => {
    e.preventDefault(); // ✅ stop navigation

    if (isDefault) {
      toast.warning("You must have at least one default account");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  return (
    <Link href={`/account/${id}`} className="block">
      <Card className="hover:shadow-md transition-shadow cursor-pointer group">

        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="capitalize text-sm font-medium">
            {name}
          </CardTitle>

          {/* ✅ prevent navigation when clicking switch */}
          <div onClick={(e) => e.preventDefault()}>
            <Switch
              checked={isDefault}
              disabled={updateDefaultLoading}
              onCheckedChange={handleDefaultChange}
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-2xl font-bold">
            ₹{Number(balance || 0).toFixed(2)}
          </div>

          <div className="text-sm text-muted-foreground capitalize">
            {type?.toLowerCase()} account
          </div>
        </CardContent>

        <CardFooter className="flex justify-between text-sm">
          <div className="flex items-center text-green-600">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            Income
          </div>

          <div className="flex items-center text-red-500">
            <ArrowUpRight className="h-4 w-4 mr-1 rotate-180" />
            Expense
          </div>
        </CardFooter>

      </Card>
    </Link>
  );
};

export default AccountCard;