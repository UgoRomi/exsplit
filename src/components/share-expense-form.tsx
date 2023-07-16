'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { DollarSign } from 'lucide-react';

const formSchema = z.object({
  income1: z.number().min(0).max(1000000),
  income2: z.number().min(0).max(1000000),
  expense: z.number().min(0).max(1000000),
});

export function ShareExpenseForm() {
  const [result, setResult] = useState<{
    person1Result?: number;
    person2Result?: number;
  }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit({ expense, income1, income2 }: z.infer<typeof formSchema>) {
    const totalIncome = income1 + income2;
    const person1Percentage = income1 / totalIncome;
    const person2Percentage = income2 / totalIncome;

    const person1Payment = expense * person1Percentage;
    const person2Payment = expense * person2Percentage;
    setResult({
      person1Result: person1Payment,
      person2Result: person2Payment,
    });
  }
  return (
    <main className='w-full flex flex-col'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='income1'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First person&apos;s income</FormLabel>
                <FormControl className='relative'>
                  <div>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <DollarSign
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <Input
                      type='number'
                      className='text-neutral-800 pl-10'
                      placeholder='Enter income'
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='income2'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second person&apos;s income</FormLabel>
                <FormControl className='relative'>
                  <div>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <DollarSign
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <Input
                      type='number'
                      placeholder='Enter income'
                      className='text-neutral-800 pl-10'
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='expense'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense</FormLabel>
                <FormControl className='relative'>
                  <div>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <DollarSign
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <Input
                      type='number'
                      placeholder='Enter expense'
                      className='text-neutral-800 pl-10'
                      {...field}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </div>
                </FormControl>
                <FormDescription>The expense you want to split</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
      {result.person1Result && result.person2Result && (
        <div className='flex justify-around mt-8'>
          <div className='flex flex-col'>
            <span className='font-bold text-2xl text-purple-400'>
              Person&apos;s 1 share:
            </span>
            <span className='font-semibold text-lg'>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(result.person1Result)}
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold text-2xl text-purple-400'>
              Person&apos;s 2 share:
            </span>
            <span className='font-semibold text-lg'>
              {Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(result.person2Result)}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
