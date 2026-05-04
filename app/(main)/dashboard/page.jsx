import CreateAccountDrawer from "@/components/ui/create-account-drawer";

export default function DashboardPage() {
  return (
    <div className="px-5">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">

        <CreateAccountDrawer>
          <div className="border border-dashed rounded-lg px-8 py-5 cursor-pointer hover:shadow-sm transition w-48">
            <span className="text-sm text-gray-600">
              + Create Account
            </span>
          </div>
        </CreateAccountDrawer>

      </div>
    </div>
  );
}