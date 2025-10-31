import { zSchema } from "@/lib/zodSchema";
import { connectDB } from "@/lib/connectDB";
import { sendMail } from "@/email/sendMail";
import { emailVerificationLink } from "@/email/emailVerificationLink";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
    try {
        await connectDB();

        const validationSchema = zSchema.pick({
            name: true,
            email: true,
            password: true
        });

        const payload = await request.json();

        let validatedData;
        try {
            validatedData = validationSchema.parse(payload);
        } catch (err) {
            return response(false, 400, 'Invalid or missing input field.', err.errors);
        }

        const { name, email, password } = validatedData;

        const checkUser = await UserModel.exists({ email });
        if (checkUser) {
            return response(false, 409, 'User already registered.');
        }

        const newUser = new UserModel({ name, email, password });
        await newUser.save();

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT({ userId: newUser._id.toString() })
            .setIssuedAt()
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1H')
            .sign(secret);

        await sendMail(
            'Email Verification request from Developer Kanchon',
            email,
            emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`)
        );

        return response(true, 201, 'Registered successfully. Please verify your email address to login.');

    } catch (error) {
        console.error(error);
        return response(false, 500, 'Something went wrong', error.message);
    }
}
