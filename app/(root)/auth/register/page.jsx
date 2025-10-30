'use client'

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Logo from '@/public/assets/images/logo-black.png'
import Image from "next/image";
import { zodResolver } from '@hookform/resolvers/zod';
import { zSchema } from '@/lib/zodSchema';
import ButtonLoading from '@/components/Application/ButtonLoading';
import { z } from "zod";
import Link from 'next/link';


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { WEBSITE_LOGIN} from '../../../../routes/WebsiteRoute'
import path from 'path'

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 👁️ state

    const formSchema = zSchema.pick({
        name: true,
        email: true,
        password: true,
    }).extend({
        confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
        },
    })

    const handleLoginSubmit = async (values) => {
        console.log(values)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <Card className='w-[400px] flex justify-center items-center min-h-[400px]'>
                <CardContent>
                    <div className='flex justify-center'>
                        <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="Logo" className='max-w-[150px]' />
                    </div>

                    <div className='text-center mb-5'>
                        <h1 className='text-2xl font-semibold'>Create Account</h1>
                        <p>Create new acount by filling out the form below.</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
                            {/* FullName field */}
                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input type="name" placeholder="name" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Email field */}
                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="example@gmail.com" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Password field with eye icon */}
                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type="password" 
                                                        placeholder="*******"
                                                        {...field}
                                                        className="pr-10" // icon এর জন্য ডানদিকে জায়গা
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Confirm Password field with eye icon */}
                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name="ConfirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type={showPassword ? "text" : "password"} // 👁️ toggle
                                                        placeholder="*******"
                                                        {...field}
                                                        className="pr-10" // icon এর জন্য ডানদিকে জায়গা
                                                    />
                                                </FormControl>

                                                {/* 👁️ eye icon */}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? (
                                                        <Eye className="w-5 h-5" />
                                                    ) : (
                                                        <EyeOff className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Submit button */}
                            <div>
                                <ButtonLoading
                                    type="submit"
                                    text="Create Account"
                                    loading={loading}
                                    className="w-full cursor-pointer text-white bg-violet-700 hover:bg-violet-800"
                                />
                            </div>
                            <div>
                                <div className='text-center flex gap-2 justify-center mt-4'>
                                    <p>Already have account?</p>
                                    <Link href={WEBSITE_LOGIN} className="text-violet-700 hover:underline">
                                        Login here
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>

    )
}

export default RegisterPage
