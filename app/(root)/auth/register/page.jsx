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
import axios from 'axios'; // ✅ axios import করা লাগবে
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
import { WEBSITE_LOGIN } from '../../../../routes/WebsiteRoute'

const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 👁️ toggle state

    // ✅ zod schema ঠিক করা
    const formSchema = zSchema.pick({
        name: true,
        email: true,
        password: true,
    }).extend({
        confirmPassword: z.string().min(3, { message: "Confirm your password" }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

    // ✅ field name এবং defaultValues একই রাখতে হবে
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '', // 🔥 আগে ভুল ছিল: confirmpassword
        },
    });

    // ✅ handle submit
    const handleRegisterSubmit = async (values) => {
        try {
            setLoading(true);
            const { data: registerResponse } = await axios.post('/api/auth/register', values);

            if (!registerResponse.success) {
                throw new Error(registerResponse.message);
            }

            form.reset();
            alert(registerResponse.message);
        } catch (error) {
            alert(error.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <Card className='w-[400px] shadow-md'>
                <CardContent className="pt-6">
                    {/* Logo */}
                    <div className='flex justify-center mb-4'>
                        <Image
                            src={Logo.src}
                            width={Logo.width}
                            height={Logo.height}
                            alt="Logo"
                            className='max-w-[150px]'
                        />
                    </div>

                    {/* Header */}
                    <div className='text-center mb-6'>
                        <h1 className='text-2xl font-semibold'>Create Account</h1>
                        <p className='text-sm text-gray-600'>
                            Create a new account by filling out the form below.
                        </p>
                    </div>

                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRegisterSubmit)}>
                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="example@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="mb-4">
                                        <FormLabel>Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="*******"
                                                    {...field}
                                                    className="pr-10"
                                                />
                                            </FormControl>
                                            {/* 👁️ Eye icon */}
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                            </button>
                                        </div>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword" // ✅ case ঠিক করা
                                render={({ field }) => (
                                    <FormItem className="mb-6">
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="*******"
                                                {...field}
                                                className="pr-10"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />

                            {/* Submit */}
                            <ButtonLoading
                                type="submit"
                                text="Create Account"
                                loading={loading}
                                className="w-full cursor-pointer text-white bg-violet-700 hover:bg-violet-800"
                            />

                            {/* Footer Links */}
                            <div className='text-center flex flex-col items-center gap-2 mt-4'>
                                <p className='text-gray-600 text-sm'>
                                    Already have an account?{' '}
                                    <Link href={WEBSITE_LOGIN} className="text-violet-700 hover:underline">
                                        Login here
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
