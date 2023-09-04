"use server";

import { redirect } from "next/navigation";

import normalizeFormData from "@/library/_/normalize-form-data";
import { ServerAction } from "@/library/_/types";

export const createSession: ServerAction = async (data: FormData) => {
	const sessionAttrs = normalizeFormData(data);

	console.log("createSession", "sessionAttrs", sessionAttrs);

	redirect("/profile/welcome");
};
