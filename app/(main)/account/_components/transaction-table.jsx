"use client";

import React, { useState } from 'react';

import { useRouter } from 'next/navigation';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';

import { Checkbox } from '@/components/ui/checkbox';

import { format } from 'date-fns';

import { categoryColors } from '@/data/categories';

import { Badge } from '@/components/ui/badge';


import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { ChevronDown, ChevronUp, Clock, MoreHorizontal } from 'lucide-react';


const RECURRING_INTERVELS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const TransactionTable = ({ transactions }) => {
  const router=useRouter();
  const [selectedIds,setSelectedIds]=useState([]);
  const [sortConfig,setSortConfig]=useState({
    field:"date",
    direction:"desc",

  });

  const filteredAndSortedTransactions = transactions;

  const handleSort = (field) => {
    setSortConfig(current=>({
        field,
        direction:
        current.field == field && current.direction === "asc"?"desc":"asc"


    }))

  };

  return (

    <div className='space-y-4'>

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>

            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("date")}
            >
              <div className='flex items-center'>
                Date{sortConfig.field === 'date' &&(
                    sortConfig.direction =="asc"?<ChevronUp className='ml-1 h-4 w-4'/>:<ChevronDown className='ml-1 h-4 w-4' />
                )}
              </div>
            </TableHead>

            <TableHead>
              Description
            </TableHead>

            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("category")}
            >
              <div className='flex items-center'>
                Category
                {sortConfig.field === 'category' &&(
                    sortConfig.direction =="asc"?<ChevronUp className='ml-1 h-4 w-4'/>:<ChevronDown className='ml-1 h-4 w-4' />
                )}
              </div>
              
            </TableHead>

            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              <div className='flex items-center justify-end'>
                Amount
                {sortConfig.field === 'amount' &&(
                    sortConfig.direction =="asc"?<ChevronUp className='ml-1 h-4 w-4'/>:<ChevronDown className='ml-1 h-4 w-4' />
                )}
              </div>

            </TableHead>

            <TableHead>
              Recurring
            </TableHead>

            <TableHead className="w-[50px]" />

          </TableRow>

        </TableHeader>

        <TableBody>

          {filteredAndSortedTransactions.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No Transactions Found
              </TableCell>

            </TableRow>

          ) : (

            filteredAndSortedTransactions.map((transaction) => (

              <TableRow key={transaction.id}>

                <TableCell>
                  <Checkbox />
                </TableCell>

                <TableCell>
                  {format(new Date(transaction.date), "dd/MM/yyyy")}
                </TableCell>

                <TableCell>
                  {transaction.description}
                </TableCell>

                <TableCell className="capitalize">

                  <span
                    style={{
                      background: categoryColors[transaction.category]
                    }}
                    className='px-2 py-1 rounded text-white text-sm'
                  >
                    {transaction.category}
                  </span>

                </TableCell>

                <TableCell
                  className="text-right font-medium"
                  style={{
                    color:
                      transaction.type === "EXPENSE"
                        ? "red"
                        : "green",
                  }}
                >

                  {transaction.type === "EXPENSE" ? "-" : "+"}

                  Rs.{transaction.amount.toFixed(2)}

                </TableCell>

                <TableCell>

                  {transaction.isRecurring ? (

                    <TooltipProvider>

                      <Tooltip>

                        <TooltipTrigger asChild>

                          <Badge
                            variant="outline"
                            className="gap-1"
                          >

                            <Clock className='h-3 w-3' />

                            {
                              RECURRING_INTERVELS[
                                transaction.recurringInterval
                              ]
                            }

                          </Badge>

                        </TooltipTrigger>

                        <TooltipContent>

                          <div className='text-sm'>

                            <div className='font-medium'>
                              Next Date:
                            </div>

                            <div>
                              {format(
                                new Date(transaction.nextRecurringDate),
                                "dd/MM/yyyy"
                              )}
                            </div>

                          </div>

                        </TooltipContent>

                      </Tooltip>

                    </TooltipProvider>

                  ) : (

                    <Badge
                      variant="outline"
                      className="gap-1"
                    >

                      <Clock className='h-3 w-3' />

                      One-Time

                    </Badge>

                  )}

                </TableCell>

                <TableCell>

                  <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className='h-4 w-4'/>
                      </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent>

                      <DropdownMenuGroup>

                        <DropdownMenuLabel 
                        onClick={() => router.push(
                            '/transaction/credit?edit=${transaction.id}'
                        )}>
                          Edit
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>

                        

                      </DropdownMenuGroup>

                      <DropdownMenuSeparator />

                      <DropdownMenuGroup>

                        <DropdownMenuItem className="text-destructive" onClick={()=>deleteFn([transaction.id])}>
                          Delete
                        </DropdownMenuItem>

                       
                      </DropdownMenuGroup>

                    </DropdownMenuContent>

                  </DropdownMenu>

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>

    </div>

  );
};

export default TransactionTable;