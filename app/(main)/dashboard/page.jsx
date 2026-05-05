
import { getUserAccounts } from "@/actions/dashboard";
import AccountCard from "./_components/accounts-card";

import CreateAccountDrawer from "@/components/ui/create-account-drawer";

export default async function DashboardPage() {
  const accounts = await getUserAccounts();

  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">

        {/* ✅ FIXED TRIGGER */}
        <CreateAccountDrawer>
          <button className="border border-dashed rounded-lg px-8 py-5 cursor-pointer hover:shadow-sm transition w-full text-left">
            <span className="text-sm text-gray-600">
              + Add New Account
            </span>
          </button>
        </CreateAccountDrawer>

        {/* ✅ Accounts */}
        {accounts?.length > 0 &&
          accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
      </div>
    </div>
  );
}