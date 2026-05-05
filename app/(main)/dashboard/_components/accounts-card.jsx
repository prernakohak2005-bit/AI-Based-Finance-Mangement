import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";

const AccountCard = ({ account }) => {
  const { name, type, balance, id, isDefault } = account;

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{name}</CardTitle>
        <Switch checked={isDefault} />
      </CardHeader>

      <CardContent>
        <p>{type}</p>
        <p className="font-semibold">₹{balance}</p>
      </CardContent>

      <CardFooter>
        <p className="text-xs text-gray-400">{id}</p>
      </CardFooter>
    </Card>
  );
};

export default AccountCard;