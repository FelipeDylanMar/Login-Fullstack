import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { CreateUserDTO } from '../types/express';

export const createUser = async ({
    email,
    password,
    name,
    status = 'Active',
    role = 'Basic',
}: CreateUserDTO) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('EMAIL_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        name,
        status,
        role,
    });

    await newUser.save();

    return {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        status: newUser.status,
        role: newUser.role,
    };
};

export const authenticateUser = async (
    email: string,
    password: string
): Promise<{
    token: string;
    user: { id: string; email: string; name: string; role: string; status: string };
}> => {

    const user = await User.findOne({ email }).select('+password');


    if (!user) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('INVALID_CREDENTIALS');
    }

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            status: user.status,
        },
    };
};

export const getAllUsers = async () => {
    return await User.find({}, '-password');
};

export const updateUserById = async (
    id: string,
    updateFields: { email?: string; password?: string; name?: string; status?: string; role?: string }
) => {
    const updateData: any = { ...updateFields };

    if (updateFields.password) {
        updateData.password = await bcrypt.hash(updateFields.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
        throw new Error('NOT_FOUND');
    }

    return updatedUser;
};

export const deleteUserById = async (id: string) => {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        throw new Error('NOT_FOUND');
    }

    return deletedUser;
};
