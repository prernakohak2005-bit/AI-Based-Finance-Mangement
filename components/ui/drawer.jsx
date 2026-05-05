"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

// ✅ ROOT (FIXED: added direction)
function Drawer({ ...props }) {
  return (
    <DrawerPrimitive.Root
      data-slot="drawer"
      direction="bottom" // 🔥 IMPORTANT FIX
      {...props}
    />
  );
}

function DrawerTrigger({ ...props }) {
  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      {...props}
    />
  );
}

function DrawerPortal({ ...props }) {
  return <DrawerPrimitive.Portal {...props} />;
}

function DrawerClose({ ...props }) {
  return <DrawerPrimitive.Close {...props} />;
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/20 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl border shadow-lg max-h-[80vh] overflow-auto p-4",
          className
        )}
        {...props}
      >
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-16 bg-gray-300 rounded-full" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      className={cn("mb-4 text-center", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }) {
  return (
    <DrawerPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <DrawerPrimitive.Description
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
};