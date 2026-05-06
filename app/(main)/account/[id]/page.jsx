import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import TransactionTable from "../_components/transaction-table";
import { BarLoader } from "react-spinners";

const AccountPage = async ({ params }) => {
  const { id } = await params; // ✅ IMPORTANT FIX

  if (!id) {
    notFound();
  }

  let accountData;

  try {
    accountData = await getAccountWithTransactions(id);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return <div>Error loading account</div>;
  }

  console.log("Account Data:", accountData);

  if (!accountData) {
    return <div>No account found for ID: {id}</div>;
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="px-5 space-y-8">
      
      <h1 className="text-5xl font-bold gradient-title">{account.name}</h1>

      <p className="text-gray-600">
        {account.type?.charAt(0) +
          account.type?.slice(1).toLowerCase()}{" "}
        Account
      </p>
   <div className="absolute top-50 right-15 text-right">
      <p className="text-2xl font-bold">
      ₹{parseFloat(account.balance || 0).toFixed(2)}
      </p>

      <p className="text-sm text-gray-500">
      {account._count?.transactions || transactions?.length || 0} Transactions
      </p>

</div>
{/*chart section*/}
{/*Transaction Table*/}
 <Suspense 
 fallback={<BarLoader className="mt-4" width={100} color="#9333ea" />}
 >
  <TransactionTable transactions={transactions}/>
 </Suspense>
</div>

 
      

      

  );
};

export default AccountPage;