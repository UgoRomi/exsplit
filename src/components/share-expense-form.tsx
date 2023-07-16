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
import { Switch } from './ui/switch';

const formSchema = z.object({
  income1: z.number().min(0).max(1000000),
  income2: z.number().min(0).max(1000000),
  expense: z.number().min(0).max(1000000),
  round: z.boolean().optional(),
});

export function ShareExpenseForm() {
  const [result, setResult] = useState<{
    person1Result?: number;
    person2Result?: number;
  }>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      round:
        typeof window !== 'undefined' &&
        window.localStorage.getItem('round') === 'false'
          ? false
          : true,
      income1:
        typeof window !== 'undefined' && window.localStorage.getItem('income1')
          ? +localStorage.getItem('income1')!
          : undefined,
      income2:
        typeof window !== 'undefined' && window.localStorage.getItem('income2')
          ? +localStorage.getItem('income2')!
          : undefined,
    },
  });

  function onSubmit({
    expense,
    income1,
    income2,
    round,
  }: z.infer<typeof formSchema>) {
    const totalIncome = income1 + income2;
    const person1Percentage = income1 / totalIncome;
    const person2Percentage = income2 / totalIncome;

    const person1Payment = expense * person1Percentage;
    const person2Payment = expense * person2Percentage;
    setResult({
      person1Result: round ? Math.round(person1Payment) : person1Payment,
      person2Result: round ? Math.round(person2Payment) : person2Payment,
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
                      className='pl-10'
                      placeholder='Enter income'
                      {...field}
                      onChange={(event) => {
                        localStorage.setItem('income1', event.target.value);
                        field.onChange(+event.target.value);
                      }}
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
                      className='pl-10'
                      {...field}
                      onChange={(event) => {
                        localStorage.setItem('income2', event.target.value);
                        field.onChange(+event.target.value);
                      }}
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
                      className='pl-10'
                      {...field}
                      onChange={(event) => {
                        localStorage.setItem('expense', event.target.value);
                        field.onChange(+event.target.value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>The expense you want to split</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='round'
            render={({ field }) => (
              <FormItem className='flex items-center gap-x-2 space-y-0'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={(e) => {
                      localStorage.setItem('round', e.toString());
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormLabel>Round results</FormLabel>
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
      {result.person1Result && result.person2Result && (
        <div className='flex flex-col md:flex-row justify-between mt-8 gap-8'>
          <div className='flex flex-col'>
            <span className='font-bold text-2xl text-purple-400'>
              Person 1&apos;s share:
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
              Person 2&apos;s share:
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
