import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const AccountCard = ({ account }) => {
  if (!account) return null;

  const { name, type, balance, id, isDefault } = account;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{name}</CardTitle>
        <Switch checked={isDefault} />
      </CardHeader>

      <CardContent>
        <div className="text-2xl font-bold">
          ${Number(balance || 0).toFixed(2)}
        </div>

        <p className="text-xs text-muted-foreground capitalize">
          {type ? type.charAt(0) + type.slice(1).toLowerCase() : ""} Account
        </p>

        <p>{type}</p>
        <p className="font-semibold">₹{balance}</p>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          Income
        </div>

        <div className="flex items-center">
          <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          Expense
        </div>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;