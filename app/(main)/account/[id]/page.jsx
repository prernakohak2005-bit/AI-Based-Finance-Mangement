import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React from "react";

const AccountPage = async ({ params }) => {
  const id = params?.id;

  const accountData = await getAccountWithTransactions(id);

  if (!accountData) {
    notFound();
  }

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight capitalize">
          {accountData.name}
        </h1>

        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Account Type
          </p>
          <p className="text-lg font-semibold capitalize">
            {accountData.type}
          </p>
        </div>

      </div>

      {/* BALANCE CARD */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Current Balance
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold mt-2">
          ₹{Number(accountData.balance || 0).toFixed(2)}
        </h2>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Total Transactions
          </p>
          <p className="text-2xl font-bold">
            {accountData.transactions?.length || 0}
          </p>
        </div>

        <div className="rounded-xl border p-4 bg-muted/20">
          <p className="text-sm text-muted-foreground">
            Account Status
          </p>
          <p className="text-2xl font-bold text-green-600">
            Active
          </p>
        </div>

      </div>

      {/* TRANSACTIONS PLACEHOLDER */}
      <div className="rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">
          Recent Transactions
        </h3>

        {accountData.transactions?.length > 0 ? (
          <div className="space-y-3">
            {accountData.transactions.slice(0, 5).map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm border-b pb-2"
              >
                <span>{tx.description || "Transaction"}</span>
                <span className="font-medium">
                  ₹{Number(tx.amount || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No transactions yet
          </p>
        )}
      </div>

    </div>
  );
};

export default AccountPage;