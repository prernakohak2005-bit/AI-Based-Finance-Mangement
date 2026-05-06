"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const serializeTransaction = (obj) => {
  if (!obj) return null;

  return {
    ...obj,
    balance: obj.balance ? Number(obj.balance) : 0,
    amount: obj.amount ? Number(obj.amount) : undefined,
  };
};

export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // ❌ remove old default
    await db.account.updateMany({
      where: { userId: user.id,isDefault:true }, // ✅ FIXED
      data: { isDefault: false },
    });

    // ✅ set new default
    const account = await db.account.update({
      where: {
        id: accountId, 
        userId:user.id,// ✅ FIXED (only id allowed)
      },
      data: {
        isDefault: true,
      },
      
    });

    revalidatePath("/dashboard");

    return {
      success: true, // ✅ FIXED spelling
      data: serializeTransaction(account),
    };
  } catch (error) {
    console.error("UPDATE DEFAULT ERROR:", error);

    return {
      success: false, // ✅ FIXED spelling
      error: error.message,
    };
  }
}