import acceptLanguage from "accept-language";
import { NextRequest, NextResponse } from "next/server";

import {
	FALLBACK_LOCALE,
	SUPPORTED_LOCALES,
	cookieName
} from "@/app/i18n/settings";

acceptLanguage.languages([...SUPPORTED_LOCALES]);

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"]
};

export const middleware = (request: NextRequest) => {
	console.log("================================");

	console.log("middleware...");

	console.log("request.method", request.method);

	console.log("request.nextUrl", request.nextUrl.toString());

	const resourceIncludesSupportedLocale = SUPPORTED_LOCALES.some((locale) =>
		request.nextUrl.pathname.startsWith(`/${locale}`)
	);

	console.log(
		"resourceIncludesSupportedLocale",
		resourceIncludesSupportedLocale
	);

	const resourceIsSystem = request.nextUrl.pathname.startsWith("/_next");

	console.log("resourceIsSystem", resourceIsSystem);

	if (!resourceIncludesSupportedLocale && !resourceIsSystem) {
		console.log("redirect required...");

		const localeFromRequest = acceptLanguage.get(
			request.cookies.get(cookieName)?.value ??
				request.headers.get("Accept-Language")
		);

		console.log("localeFromRequest", localeFromRequest);

		const target = new URL(
			`/${localeFromRequest ?? FALLBACK_LOCALE}${
				request.nextUrl.pathname
			}`,
			request.url
		);

		console.log("target", target.toString());

		console.log("--------------------------------");

		return NextResponse.redirect(target);
	}

	if (request.headers.has("referer")) {
		console.log("found referer...");

		const refererUrl = new URL(request.headers.get("referer") as string);

		console.log("refererUrl", refererUrl.toString());

		const localeInReferer = SUPPORTED_LOCALES.find((l) =>
			refererUrl.pathname.startsWith(`/${l}`)
		);

		console.log("localeInReferer", localeInReferer);

		const response = NextResponse.next();

		if (localeInReferer) {
			console.log("locale in referer is valid - setting cookie...");

			console.log("cookieName", cookieName);

			console.log("localeInReferer", localeInReferer);

			response.cookies.set(cookieName, localeInReferer);
		}

		console.log("--------------------------------");

		return response;
	}

	console.log("--------------------------------");

	return NextResponse.next();
};
