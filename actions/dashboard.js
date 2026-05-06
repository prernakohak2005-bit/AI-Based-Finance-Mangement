"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ======================
// SERIALIZER
// ======================
const serialize = (obj) => {
  if (!obj) return null;

  return {
    ...obj,
    balance: obj.balance ? Number(obj.balance) : 0,
  };
};

// ======================
// GET ACCOUNTS
// ======================
export async function getUserAccounts() {
  try {
    const { userId } = await auth();
    if (!userId) return [];

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) return [];

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return accounts.map(serialize);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// ======================
// CREATE ACCOUNT
// ======================
export async function createAccount(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const balance = Number(data.balance);
    if (isNaN(balance)) throw new Error("Invalid balance");

    const existingAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const isDefault =
      existingAccounts.length === 0 ? true : !!data.isDefault;

    // if setting default → reset others
    if (isDefault) {
      await db.account.updateMany({
        where: { userId: user.id },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        name: data.name,
        type: data.type,
        balance,
        isDefault,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");

    return serialize(account);
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to create account");
  }
}

// ======================
// SET DEFAULT ACCOUNT
// ======================
export async function setDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // verify account belongs to user
    const account = await db.account.findFirst({
      where: {
        id: accountId,
        userId: user.id,
      },
    });

    if (!account) throw new Error("Account not found");

    // remove previous default
    await db.account.updateMany({
      where: { userId: user.id },
      data: { isDefault: false },
    });

    // set new default
    await db.account.update({
      where: { id: accountId },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Failed to set default");
  }
}