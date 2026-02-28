import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { licenseKey } = await request.json();

    const actualLicenseKey = process.env.LICENSE_KEY;

    if (!actualLicenseKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (licenseKey === actualLicenseKey) {
      return NextResponse.json(
        { success: true, message: 'License verified successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid license key' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('License verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify license' },
      { status: 500 }
    );
  }
}
