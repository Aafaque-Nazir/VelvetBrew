import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { validateAdminRequest } from "@/lib/admin";

export async function POST(request) {
  try {
    const adminValidation = await validateAdminRequest();
    if (!adminValidation.success) {
        return adminValidation.response;
    }

    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + '.webp';
    
    // Save to public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const path = join(uploadDir, filename);

    // Compress using Sharp
    // Resize to max width 1200px (retina ready but not huge)
    // Convert to WebP (better compression than JPG/PNG)
    // Quality 80 (good balance)
    await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path);
    
    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
