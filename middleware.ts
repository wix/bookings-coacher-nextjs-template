import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_LOGIN_CALLBACK_PARAM,
  AUTH_LOGIN_PATHNAME,
  REDIRECT_FROM_WIX_LOGIN_STATUS,
  WIX_REFRESH_TOKEN,
} from '@app/model/auth/auth.const';
import { getServerWixClient } from '@app/model/auth/wix-client.server';
import type { WixClientType } from '@app/model/auth/wix-client.base';

const setVisitorTokens = async ({
  wixClient,
  response,
}: {
  wixClient: WixClientType;
  request: NextRequest;
  response: NextResponse;
}) => {
  const tokens = await wixClient!.auth.generateVisitorTokens();
  response.cookies.set(WIX_REFRESH_TOKEN, JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });
};

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const res = NextResponse.next();
  const wixClient = getServerWixClient({
    cookieStore: request.cookies,
  });
  const isLoggedIn = wixClient?.auth.loggedIn();
  if (!cookies.get(WIX_REFRESH_TOKEN) && !isLoggedIn) {
    await setVisitorTokens({ response: res, wixClient, request });
  }
  const wixMemberLoggedIn = request.nextUrl.searchParams.get(
    REDIRECT_FROM_WIX_LOGIN_STATUS
  );
  if (wixMemberLoggedIn === 'false' && isLoggedIn) {
    cookies.delete(WIX_REFRESH_TOKEN);
    await setVisitorTokens({ response: res, wixClient, request });
  }
  if (
    wixMemberLoggedIn === 'true' ||
    (!isLoggedIn && request.nextUrl.pathname.startsWith('/account'))
  ) {
    const redirectUrl = new URL(AUTH_LOGIN_PATHNAME, request.url);
    const loginCallbackUrl = new URL(request.url);
    redirectUrl.searchParams.delete(REDIRECT_FROM_WIX_LOGIN_STATUS);
    loginCallbackUrl.searchParams.delete(REDIRECT_FROM_WIX_LOGIN_STATUS);
    redirectUrl.searchParams.set(
      AUTH_LOGIN_CALLBACK_PARAM,
      loginCallbackUrl.toString()
    );
    return NextResponse.redirect(redirectUrl);
  }
  res.headers.set(
    'x-test-proto',
    JSON.stringify({
      xProto: request.headers.get('x-forwarded-proto'),
      nextUrl: request.nextUrl.protocol,
    })
  );
  return res;
}

export const config = {
  unstable_allowDynamic: [
    '**/node_modules/lodash/**',
    '**/node_modules/@wix/**',
  ],
};
