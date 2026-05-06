import { getUserAccounts } from "@/actions/dashboard";
import AccountCard from "./_components/accounts-card";
import CreateAccountDrawer from "@/components/ui/create-account-drawer";

import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const accounts = await getUserAccounts();

  return (
    <div className="px-5 space-y-6">

      {/* Title */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {/* ✅ ADD ACCOUNT CARD (FIXED DRAWER TRIGGER) */}
        <CreateAccountDrawer>
          <Card className="cursor-pointer border-dashed hover:shadow-md transition-shadow flex items-center justify-center min-h-[160px]">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Plus className="h-8 w-8 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </div>
          </Card>
        </CreateAccountDrawer>

        {/* ACCOUNTS */}
        {accounts?.length > 0 ? (
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <div className="text-muted-foreground col-span-full text-center py-10">
            No accounts found
          </div>
        )}

      </div>
    </div>
  );
}