'use client'

import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'
import { ExpensesList } from '@/components/dashboard/expenses-list'
import { ExpenseSplitSummary } from '@/components/dashboard/expense-split-summary'
import { GroupMembersList } from '@/components/dashboard/group-members-list'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

export default function ExpensesPage() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Expense Tracker</h1>
            <p className="text-muted-foreground">
              Track and split expenses with your travel group
            </p>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <ExpensesList />
            </div>
            <div className="flex flex-col gap-6">
              <ExpenseSplitSummary />
              <GroupMembersList />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}