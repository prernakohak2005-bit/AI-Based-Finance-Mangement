import { db } from "@/lib/prisma";

export default async function AccountPage({ params }) {
  const id = params?.id;

  // safety check (prevents crash)
  if (!id) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Invalid account ID
        </h1>
      </div>
    );
  }

  const account = await db.account.findUnique({
    where: { id },
  });

  if (!account) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">
          Account not found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {account.name}
      </h1>

      <p>Type: {account.type}</p>

      <p>
        Balance: ₹{Number(account.balance || 0).toFixed(2)}
      </p>

      <p>
        Default: {account.isDefault ? "Yes" : "No"}
      </p>
    </div>
  );
}