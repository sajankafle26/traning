import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { auth } from '@/auth';
import bcrypt from 'bcryptjs';

// GET - List all students (admin only)
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const courseId = searchParams.get('courseId');

    const query: any = { role: 'student' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (courseId) {
      query.enrolledCourses = courseId;
    }

    const students = await User.find(query)
      .select('-password')
      .populate('enrolledCourses', 'title thumbnail')
      .sort({ createdAt: -1 });

    return NextResponse.json(students);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Create a new student (admin only)
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, email, password, phone, enrolledCourses } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'name, email, password required' }, { status: 400 });
    }

    await dbConnect();

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'student',
      enrolledCourses: enrolledCourses || [],
    });

    return NextResponse.json({
      _id: student._id,
      name: student.name,
      email: student.email,
      role: student.role,
      enrolledCourses: student.enrolledCourses,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update student (admin only)
export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { _id, name, email, phone, enrolledCourses, password } = await req.json();
    if (!_id) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }

    await dbConnect();

    const updateData: any = { name, email, phone, enrolledCourses };
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const student = await User.findByIdAndUpdate(_id, updateData, { new: true })
      .select('-password')
      .populate('enrolledCourses', 'title thumbnail');

    return NextResponse.json(student);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Remove student (admin only)
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 });
    }

    await dbConnect();
    await User.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Student deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
