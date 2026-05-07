"use client";
import React from 'react'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'

import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns';

const TransactionTable = ({ transactions }) => {

  const filteredAndSortedTransactions = transactions;

  const handleSort = () => {

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
              <div className='flex items-center'>Date</div>
            </TableHead>

            <TableHead>
              Description
            </TableHead>

            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("category")}
            >
              <div className='flex items-center'>Category</div>
            </TableHead>

            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("amount")}
            >
              <div className='flex items-center justify-end'>Amount</div>
            </TableHead>

            <TableHead>Recurring</TableHead>

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

                <TableCell className="text-right">
                  $250.00
                </TableCell>

                <TableCell>
                  No
                </TableCell>

                <TableCell />
              </TableRow>

            ))

          )}

        </TableBody>

      </Table>

    </div>
  )
}

export default TransactionTable;