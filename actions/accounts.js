"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ======================
// SERIALIZER
// ======================
const serializeTransaction = (obj) => {
  if (!obj) return null;

  return {
    ...obj,
    balance: obj.balance ? Number(obj.balance) : 0,
    amount: obj.amount ? Number(obj.amount) : undefined,
  };
};

// ======================
// UPDATE DEFAULT ACCOUNT
// ======================
export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // remove current default
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });

    // set new default (SAFE VERSION)
    const account = await db.account.update({
      where: {
        id: accountId,
      },
      data: {
        isDefault: true,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: serializeTransaction(account),
    };
  } catch (error) {
    console.error("UPDATE DEFAULT ERROR:", error);

    return {
      success: false,
      error: error.message,
    };
  }
}

// ======================
// GET ACCOUNT + TRANSACTIONS
// ======================
export async function getAccountWithTransactions(accountId) {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    const account = await db.account.findFirst({
      where: {
        id: accountId,
        userId: user.id,
      },
      include: {
        transactions: {
          orderBy: { date: "desc" },
        },
        _count: {
          select: { transactions: true },
        },
      },
    });

    if (!account) return null;

    return {
      ...serializeTransaction(account),
      transactions: account.transactions.map(serializeTransaction),
    };
  } catch (error) {
    console.error("ACCOUNT FETCH ERROR:", error);
    return null;
  }
}