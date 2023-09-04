"use client";

import { z } from "zod";

import Form, { useForm } from "@/components/Form/Form";
import TextField, { useTextField } from "@/components/TextField/TextField";
import { ServerAction } from "@/library/_/types";

import styles from "./form.module.css";

export default function CreateSessionForm({
	action: createSession
}: {
	action: ServerAction;
}) {
	const form = useForm(
		createSession,
		z.object({
			email: z.string(),
			password: z.string()
		})
	);

	const email = useTextField(form, "email", "");

	const password = useTextField(form, "password", "");

	return (
		<Form {...form} className={styles.form} submitLabel="Create Session">
			<TextField {...email} label="Email" required type="email" />

			<TextField
				{...password}
				label="Password"
				required
				type="password"
			/>
		</Form>
	);
}
