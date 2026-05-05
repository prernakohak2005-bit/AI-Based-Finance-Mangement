"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ✅ serializer
const serializeTransaction = (obj) => {
  if (!obj) return null;

  return {
    ...obj,
    balance: obj.balance ? Number(obj.balance) : 0,
    amount: obj.amount ? Number(obj.amount) : undefined,
  };
};

// ✅ CREATE ACCOUNT
export async function createAccount(data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized: No user session found");
    }

    // check user in DB
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    // validate balance
    const balanceFloat = parseFloat(data.balance);

    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance amount");
    }

    // get existing accounts
    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    // default logic
    const shouldBeDefault =
      existingAccounts.length === 0 ? true : !!data.isDefault;

    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    // create account
    const account = await db.account.create({
      data: {
        name: data.name,
        type: data.type,
        balance: balanceFloat,
        isDefault: shouldBeDefault,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: serializeTransaction(account),
    };
  } catch (error) {
    console.error("CREATE ACCOUNT ERROR:", error);
    throw new Error(error?.message || "Something went wrong");
  }
}

// ✅ GET USER ACCOUNTS
export async function getUserAccounts() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized: No user session found");
    }

    // get user
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
    });

    // serialize array
    const serializedAccounts = accounts.map(serializeTransaction);

    return serializedAccounts;
  } catch (error) {
    console.error("GET ACCOUNTS ERROR:", error);
    throw new Error(error?.message || "Something went wrong");
  }
}