"use client";

import { DashboardHome } from "@/components/DashboardHome";
import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function DashboardPage() {
  return (
    <DashboardSidebar>
      <div className="">
        <DashboardHome />
      </div>
    </DashboardSidebar>
  );
}